import { Band } from '../ui';
import '../ui/feature.css';
import '../ui/icp.css';
import '../ui/prose.css';

// About, contact and the three legal pages on the Campfire pattern (plan
// 2026-10-30-003, Task 8): a dark hero holding the h1, then the page's own
// prose in a white band. The root carries .ui-feature .ui-icp so the
// one-column hero is the ICP pages' own skin. Motion: none.
function CompanyPageLayout({ title, children }) {
  return (
    <div className="ui-feature ui-icp">
      <Band tone="band" id="hero">
        <div className="ui-hero">
          <div className="ui-hero-copy">
            <h1 className="ui-hero-title">{title}</h1>
          </div>
        </div>
      </Band>
      <Band tone="white" id="body">
        <div className="ui-prose">{children}</div>
      </Band>
    </div>
  );
}

export default CompanyPageLayout;
