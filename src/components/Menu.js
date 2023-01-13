import { useEffect } from "react";
import styles from "./Menu.module.css";

const Menu = ({ onClose }) => {
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  return (
    <div className={styles.menuDiv} data-animate-on-scroll>
      <div className={styles.divitems}>
        <div className={styles.ytdGuideEntryRendererDiv}>
          <div className={styles.tpYtPaperItemDiv}>
            <img className={styles.svgIcon} alt="" src="../svg47.svg" />
            <div className={styles.ytFormattedStringDiv}>
              <div className={styles.homeDiv}>Home</div>
            </div>
          </div>
        </div>
        <div className={styles.ytdGuideEntryRendererDiv1}>
          <div className={styles.tpYtPaperItemDiv}>
            <img className={styles.svgIcon} alt="" src="../svg48.svg" />
            <div className={styles.ytFormattedStringDiv}>
              <div className={styles.shortsDiv}>Shorts</div>
            </div>
          </div>
        </div>
        <div className={styles.ytdGuideEntryRendererDiv2}>
          <div className={styles.tpYtPaperItemDiv}>
            <img className={styles.svgIcon} alt="" src="../svg49.svg" />
            <div className={styles.ytFormattedStringDiv}>
              <div className={styles.subscriptionsDiv}>Subscriptions</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.divitems1}>
        <div className={styles.ytdGuideEntryRendererDiv3}>
          <div className={styles.tpYtPaperItemDiv}>
            <img className={styles.svgIcon} alt="" src="../svg50.svg" />
            <div className={styles.ytFormattedStringDiv}>
              <div className={styles.libraryDiv}>Library</div>
            </div>
          </div>
        </div>
        <div className={styles.ytdGuideEntryRendererDiv1}>
          <div className={styles.tpYtPaperItemDiv}>
            <img className={styles.svgIcon} alt="" src="../svg51.svg" />
            <div className={styles.ytFormattedStringDiv}>
              <div className={styles.historyDiv}>History</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.ytdGuideSigninPromoRendereDiv}>
        <div className={styles.signInToLikeVideosCommen}>
          Sign in to like videos, comment, and subscribe.
        </div>
        <div className={styles.ytdButtonRendererDiv}>
          <div className={styles.aDiv}>
            <img className={styles.svgIcon5} alt="" src="../svg52.svg" />
            <div className={styles.div}>
              <div className={styles.signInDiv}>Sign in</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.ytdGuideSectionRendererDiv}>
        <div className={styles.exploreDiv}>Explore</div>
        <div className={styles.divitems2}>
          <div className={styles.ytdGuideEntryRendererDiv5}>
            <div className={styles.tpYtPaperItemDiv}>
              <img className={styles.svgIcon} alt="" src="../svg53.svg" />
              <div className={styles.ytFormattedStringDiv}>
                <div className={styles.trendingDiv}>Trending</div>
              </div>
            </div>
          </div>
          <div className={styles.ytdGuideEntryRendererDiv6}>
            <div className={styles.tpYtPaperItemDiv}>
              <img className={styles.svgIcon} alt="" src="../svg54.svg" />
              <div className={styles.ytFormattedStringDiv}>
                <div className={styles.musicDiv}>Music</div>
              </div>
            </div>
          </div>
          <div className={styles.ytdGuideEntryRendererDiv7}>
            <div className={styles.tpYtPaperItemDiv}>
              <img className={styles.svgIcon} alt="" src="../svg55.svg" />
              <div className={styles.ytFormattedStringDiv}>
                <div className={styles.moviesTV}>{`Movies & TV`}</div>
              </div>
            </div>
          </div>
          <div className={styles.ytdGuideEntryRendererDiv8}>
            <div className={styles.tpYtPaperItemDiv}>
              <img className={styles.svgIcon} alt="" src="../svg56.svg" />
              <div className={styles.ytFormattedStringDiv}>
                <div className={styles.liveDiv}>Live</div>
              </div>
            </div>
          </div>
          <div className={styles.ytdGuideEntryRendererDiv9}>
            <div className={styles.tpYtPaperItemDiv}>
              <img className={styles.svgIcon} alt="" src="../svg57.svg" />
              <div className={styles.ytFormattedStringDiv}>
                <div className={styles.gamingDiv}>Gaming</div>
              </div>
            </div>
          </div>
          <div className={styles.ytdGuideEntryRendererDiv10}>
            <div className={styles.tpYtPaperItemDiv}>
              <img className={styles.svgIcon} alt="" src="../svg58.svg" />
              <div className={styles.ytFormattedStringDiv}>
                <div className={styles.newsDiv}>News</div>
              </div>
            </div>
          </div>
          <div className={styles.ytdGuideEntryRendererDiv11}>
            <div className={styles.tpYtPaperItemDiv}>
              <img className={styles.svgIcon} alt="" src="../svg59.svg" />
              <div className={styles.ytFormattedStringDiv}>
                <div className={styles.sportsDiv}>Sports</div>
              </div>
            </div>
          </div>
          <div className={styles.ytdGuideEntryRendererDiv12}>
            <div className={styles.tpYtPaperItemDiv}>
              <img className={styles.svgIcon} alt="" src="../svg60.svg" />
              <div className={styles.ytFormattedStringDiv}>
                <div className={styles.learningDiv}>Learning</div>
              </div>
            </div>
          </div>
          <div className={styles.ytdGuideEntryRendererDiv13}>
            <div className={styles.tpYtPaperItemDiv}>
              <img className={styles.svgIcon} alt="" src="../svg61.svg" />
              <div className={styles.ytFormattedStringDiv}>
                <div className={styles.fashionBeauty}>{`Fashion & Beauty`}</div>
              </div>
            </div>
          </div>
          <div className={styles.ytdGuideEntryRendererDiv14}>
            <div className={styles.tpYtPaperItemDiv}>
              <img className={styles.svgIcon} alt="" src="../svg62.svg" />
              <div className={styles.ytFormattedStringDiv}>
                <div className={styles.podcastsDiv}>Podcasts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.ytdGuideEntryRendererDiv15}>
        <div className={styles.tpYtPaperItemDiv15}>
          <img className={styles.svgIcon} alt="" src="../svg63.svg" />
          <div className={styles.ytFormattedStringDiv}>
            <div className={styles.browseChannelsDiv}>Browse channels</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
