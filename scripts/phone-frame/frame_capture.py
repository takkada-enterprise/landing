"""Put a flat phone capture inside the site's iPhone frame.

Every older screen on the site came from the operator as a 2092x4331 PNG with
an iPhone frame and status bar already baked in. A capture taken straight off
the app (1080x2238, no frame) renders as a bare rectangle next to them. This
writes the capture into that same frame so scripts/exportScreens.mjs produces
the same look and the same 360x746 box.

  python3 scripts/phone-frame/frame_capture.py screens-raw/2026-11-05/x.png mockups/x.png

phone-frame.png is the frame and the 12:05 status bar lifted from one of the
operator's own framed mockups, with the screen cut out below the status bar.
phone-screen-mask.png is that cut-out. The capture is scaled to the cut-out's
height and centred; the few pixels it falls short on each side are filled by
repeating its own edge column, so a full-width bar runs on to the bezel.

The output is a derivation of the raw capture, not new evidence: a framed file
still goes on the unproven backlog in content/image-provenance.json with the
raw capture named in its reason, exactly as the unframed export did.
"""

import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent


def frame(raw_path, out_path):
    frame_img = Image.open(HERE / 'phone-frame.png').convert('RGBA')
    mask = Image.open(HERE / 'phone-screen-mask.png').convert('L')
    left, top, right, bottom = 75, 328, 2010, 4263  # the cut-out's box
    box_w, box_h = right - left, bottom - top

    raw = Image.open(raw_path).convert('RGB')
    w = round(raw.width * box_h / raw.height)
    if w <= box_w:
        shot = raw.resize((w, box_h), Image.LANCZOS)
        screen = Image.new('RGB', (box_w, box_h))
        pad = (box_w - w) // 2
        screen.paste(shot, (pad, 0))
        if pad:
            screen.paste(shot.crop((0, 0, 1, box_h)).resize((pad, box_h)), (0, 0))
        rest = box_w - pad - w
        if rest:
            screen.paste(shot.crop((w - 1, 0, w, box_h)).resize((rest, box_h)), (pad + w, 0))
    else:
        # Wider than the phone: fit the width and let the bottom run off.
        h = round(raw.height * box_w / raw.width)
        screen = raw.resize((box_w, h), Image.LANCZOS).crop((0, 0, box_w, box_h))

    out = Image.new('RGBA', frame_img.size, (0, 0, 0, 0))
    out.paste(screen, (left, top), mask.crop((left, top, right, bottom)))
    out.alpha_composite(frame_img)
    out.save(out_path, optimize=True)


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    frame(sys.argv[1], sys.argv[2])
