import { formatDistance } from "date-fns";
import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import PortalPopup from "../components/PortalPopup";
import { listWithLogos, listWithStatistics } from "../utils/getMeta";
import styles from "./SearchResults.module.css";
import YoutubeSearchBar from "../components/YoutubeSearchBar";

const SearchResults = () => {
  const [isMenuPopupOpen, setMenuPopupOpen] = useState(false);

  const [videos, setVideos] = useState([])
  const navigate = useNavigate();
  const openMenuPopup = useCallback(() => {
    setMenuPopupOpen(true);
  }, []);

  const closeMenuPopup = useCallback(() => {
    setMenuPopupOpen(false);
  }, []);
  const { state } = useLocation();


  async function getResults(youtube_search) {
    const results = await fetch(youtube_search, {
      method: "GET",
    }).then(res => res.json());
    let v = await listWithLogos(results)
    v = await listWithStatistics(v)
    setVideos(v)

    console.log(v)
  }


  useEffect(() => {
    if (state?.searchTerm) {
      let youtube_search = `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_API_KEY}&q=${state.searchTerm}&type=video&part=snippet&maxResults=12`;

      getResults(youtube_search)

    
    }
  }, [])
  function handleSearchClick(searchValue) {
    let youtube_search = `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_API_KEY}&q=${searchValue}&type=video&part=snippet&maxResults=12`;
    getResults(youtube_search)

  }
  function handleVideoClick(id) {
    navigate('/video-page', { state: { id: id } })
  }
  return (
    <>
      <div className={styles.searchResultsDiv}>
        <YoutubeSearchBar
          svg="../svg.svg"
          ytdTopbarLogoRenderer="../ytdtopbarlogorenderer.svg"
          svg1="../svg1.svg"
          divvoiceSearchButton="../divvoicesearchbutton.svg"
          vector="../vector.svg"
          ytIconButton="../yticonbutton.svg"
          svg2="../svg2.svg"
          onClick={handleSearchClick}
        />
        <div className={styles.divContent}>
          <div className={styles.divsections}>
            <div className={styles.divitems}>
              <div className={styles.ytdGuideEntryRendererDiv}>
                <div className={styles.tpYtPaperItemDiv}>
                  <img className={styles.svgIcon3} alt="" src="../svg23.svg" />
                  <div className={styles.ytFormattedStringDiv}>
                    <div className={styles.homeDiv}>Home</div>
                  </div>
                </div>
              </div>
              <div className={styles.ytdGuideEntryRendererDiv1}>
                <div className={styles.tpYtPaperItemDiv}>
                  <img className={styles.svgIcon3} alt="" src="../svg24.svg" />
                  <div className={styles.ytFormattedStringDiv}>
                    <div className={styles.shortsDiv}>Shorts</div>
                  </div>
                </div>
              </div>
              <div className={styles.ytdGuideEntryRendererDiv2}>
                <div className={styles.tpYtPaperItemDiv}>
                  <img className={styles.svgIcon3} alt="" src="../svg25.svg" />
                  <div className={styles.ytFormattedStringDiv}>
                    <div className={styles.subscriptionsDiv}>Subscriptions</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.divitems1}>
              <div className={styles.ytdGuideEntryRendererDiv3}>
                <div className={styles.tpYtPaperItemDiv}>
                  <img className={styles.svgIcon3} alt="" src="../svg26.svg" />
                  <div className={styles.ytFormattedStringDiv}>
                    <div className={styles.libraryDiv}>Library</div>
                  </div>
                </div>
              </div>
              <div className={styles.ytdGuideEntryRendererDiv1}>
                <div className={styles.tpYtPaperItemDiv}>
                  <img className={styles.svgIcon3} alt="" src="../svg27.svg" />
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
              <div className={styles.ytdButtonRendererDiv1}>
                <div className={styles.aDiv}>
                  <img className={styles.svgIcon2} alt="" src="../svg28.svg" />
                  <div className={styles.div}>
                    <div className={styles.signInDiv1}>Sign in</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.ytdGuideSectionRendererDiv}>
              <div className={styles.exploreDiv}>Explore</div>
              <div className={styles.divitems2}>
                <div className={styles.ytdGuideEntryRendererDiv5}>
                  <div className={styles.tpYtPaperItemDiv}>
                    <img
                      className={styles.svgIcon3}
                      alt=""
                      src="../svg29.svg"
                    />
                    <div className={styles.ytFormattedStringDiv}>
                      <div className={styles.trendingDiv}>Trending</div>
                    </div>
                  </div>
                </div>
                <div className={styles.ytdGuideEntryRendererDiv6}>
                  <div className={styles.tpYtPaperItemDiv}>
                    <img
                      className={styles.svgIcon3}
                      alt=""
                      src="../svg30.svg"
                    />
                    <div className={styles.ytFormattedStringDiv}>
                      <div className={styles.musicDiv}>Music</div>
                    </div>
                  </div>
                </div>
                <div className={styles.ytdGuideEntryRendererDiv7}>
                  <div className={styles.tpYtPaperItemDiv}>
                    <img
                      className={styles.svgIcon3}
                      alt=""
                      src="../svg31.svg"
                    />
                    <div className={styles.ytFormattedStringDiv}>
                      <div className={styles.moviesTV}>{`Movies & TV`}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.ytdGuideEntryRendererDiv8}>
                  <div className={styles.tpYtPaperItemDiv}>
                    <img
                      className={styles.svgIcon3}
                      alt=""
                      src="../svg32.svg"
                    />
                    <div className={styles.ytFormattedStringDiv}>
                      <div className={styles.liveDiv}>Live</div>
                    </div>
                  </div>
                </div>
                <div className={styles.ytdGuideEntryRendererDiv9}>
                  <div className={styles.tpYtPaperItemDiv}>
                    <img
                      className={styles.svgIcon3}
                      alt=""
                      src="../svg33.svg"
                    />
                    <div className={styles.ytFormattedStringDiv}>
                      <div className={styles.gamingDiv}>Gaming</div>
                    </div>
                  </div>
                </div>
                <div className={styles.ytdGuideEntryRendererDiv10}>
                  <div className={styles.tpYtPaperItemDiv}>
                    <img
                      className={styles.svgIcon3}
                      alt=""
                      src="../svg34.svg"
                    />
                    <div className={styles.ytFormattedStringDiv}>
                      <div className={styles.newsDiv}>News</div>
                    </div>
                  </div>
                </div>
                <div className={styles.ytdGuideEntryRendererDiv11}>
                  <div className={styles.tpYtPaperItemDiv}>
                    <img
                      className={styles.svgIcon3}
                      alt=""
                      src="../svg35.svg"
                    />
                    <div className={styles.ytFormattedStringDiv}>
                      <div className={styles.sportsDiv}>Sports</div>
                    </div>
                  </div>
                </div>
                <div className={styles.ytdGuideEntryRendererDiv12}>
                  <div className={styles.tpYtPaperItemDiv}>
                    <img
                      className={styles.svgIcon3}
                      alt=""
                      src="../svg36.svg"
                    />
                    <div className={styles.ytFormattedStringDiv}>
                      <div className={styles.learningDiv}>Learning</div>
                    </div>
                  </div>
                </div>
                <div className={styles.ytdGuideEntryRendererDiv13}>
                  <div className={styles.tpYtPaperItemDiv}>
                    <img
                      className={styles.svgIcon3}
                      alt=""
                      src="../svg37.svg"
                    />
                    <div className={styles.ytFormattedStringDiv}>
                      <div
                        className={styles.fashionBeauty}
                      >{`Fashion & Beauty`}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.ytdGuideEntryRendererDiv14}>
                  <div className={styles.tpYtPaperItemDiv}>
                    <img
                      className={styles.svgIcon3}
                      alt=""
                      src="../svg38.svg"
                    />
                    <div className={styles.ytFormattedStringDiv}>
                      <div className={styles.podcastsDiv}>Podcasts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.ytdGuideEntryRendererDiv15}>
              <div className={styles.tpYtPaperItemDiv15}>
                <img className={styles.svgIcon3} alt="" src="../svg39.svg" />
                <div className={styles.ytFormattedStringDiv}>
                  <div className={styles.browseChannelsDiv}>
                    Browse channels
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.ytdSectionListRendererDiv}>
            <div className={styles.ytdSearchSubMenuRendererDiv}>
              <div className={styles.ytdToggleButtonRendererDiv}>
                <div className={styles.searchFiltersDiv}>
                  <img className={styles.svgIcon20} alt="" src="../svg40.svg" />
                  <div className={styles.div2}>
                    <div className={styles.filtersDiv}>Filters</div>
                  </div>
                </div>
              </div>
              <img
                className={styles.divfilterMenuborderIcon}
                alt=""
                src="../divfiltermenuborder.svg"
              />
            </div>
            <div className={styles.frameDiv}>
              {videos.length ? videos.map(video => {
                return <div key={video?.id?.videoId}
                  onClick={() => handleVideoClick(video?.id?.videoId)}
                  className={styles.ytdVideoRendererDiv}>
                  <img
                    className={styles.athumbnailIcon}
                    alt=""
                    src={video?.snippet?.thumbnails?.medium?.url}
                  />
                  <div className={styles.div3}>
                    <div className={styles.divmeta}>
                      <div className={styles.figmaDesignToLiveWebsiteW}>
                        {video?.snippet?.title}
                      </div>
                      <div className={styles.divmetadataLine}>
                        <div className={styles.kViewsDiv}>{video?.statistics?.viewCount > 1000 ? Math.ceil(video?.statistics?.viewCount / 1000) + 'K' : video?.statistics?.viewCount} views</div>
                        <div className={styles.kViewsDiv}>• {video?.snippet?.publishedAt ? formatDistance(new Date(video?.snippet?.publishedAt), new Date(), { addSuffix: true }) : null}</div>
                      </div>
                    </div>
                    <div className={styles.divchannelInfo}>
                      <div className={styles.ytImgShadowDiv}>
                        <img
                          className={styles.gqvpuAg9wAYV3eMkh5UtoQkdvHiMGLIcon}
                          alt=""
                          src={video?.logo}
                        />
                      </div>
                      <div className={styles.kViewsDiv}>{video?.snippet?.channelTitle}</div>
                    </div>
                    <div className={styles.inThisVideoYoullBeLearni}>
                      <span>{video?.snippet?.description}</span>

                    </div>
                  </div>
                </div>
              }) : <div>Loading...</div>}

              {/* <div className={styles.ytdVideoRendererDiv}>
                <img
                  className={styles.athumbnailIcon}
                  alt=""
                  src="../athumbnail1@2x.png"
                />
                <div className={styles.div3}>
                  <div className={styles.divmeta}>
                    <div className={styles.figmaDesignToLiveWebsiteW}>
                      Figma Design to Live Website with Locofy.ai
                    </div>
                    <div className={styles.divmetadataLine}>
                      <div className={styles.kViewsDiv}>6.3K views</div>
                      <div className={styles.kViewsDiv}>• 3 months ago</div>
                    </div>
                  </div>
                  <div className={styles.divchannelInfo}>
                    <div className={styles.ytImgShadowDiv}>
                      <img
                        className={styles.gqvpuAg9wAYV3eMkh5UtoQkdvHiMGLIcon}
                        alt=""
                        src="../gqvpuag9wayv3emkh5utoqkdvhimgla2vtqebhu2rp0zcc1i4ta6opb90ysan3swuvbevm8s68ckc0x00ffffffnorj1@2x.png"
                      />
                    </div>
                    <div className={styles.kViewsDiv}>Locofy</div>
                  </div>
                  <div className={styles.inThisVideoYoullBeLearni}>
                    <span>{`In this video you'll be learning how to go from a popular Figma design template to a Live Website using `}</span>
                    <span className={styles.locofySpan}>Locofy</span>
                    <span>{`.ai! With `}</span>
                    <span className={styles.locofySpan}>Locofy</span>
                    <span>.ai ...</span>
                  </div>
                </div>
              </div>
              <div className={styles.ytdVideoRendererDiv}>
                <img
                  className={styles.athumbnailIcon}
                  alt=""
                  src="../athumbnail2@2x.png"
                />
                <div className={styles.div3}>
                  <div className={styles.divmeta}>
                    <div className={styles.figmaDesignToLiveWebsiteW}>
                      Figma Design to Live Website with Locofy.ai
                    </div>
                    <div className={styles.divmetadataLine}>
                      <div className={styles.kViewsDiv}>6.3K views</div>
                      <div className={styles.kViewsDiv}>• 3 months ago</div>
                    </div>
                  </div>
                  <div className={styles.divchannelInfo}>
                    <div className={styles.ytImgShadowDiv}>
                      <img
                        className={styles.gqvpuAg9wAYV3eMkh5UtoQkdvHiMGLIcon}
                        alt=""
                        src="../gqvpuag9wayv3emkh5utoqkdvhimgla2vtqebhu2rp0zcc1i4ta6opb90ysan3swuvbevm8s68ckc0x00ffffffnorj2@2x.png"
                      />
                    </div>
                    <div className={styles.kViewsDiv}>Locofy</div>
                  </div>
                  <div className={styles.inThisVideoYoullBeLearni}>
                    <span>{`In this video you'll be learning how to go from a popular Figma design template to a Live Website using `}</span>
                    <span className={styles.locofySpan}>Locofy</span>
                    <span>{`.ai! With `}</span>
                    <span className={styles.locofySpan}>Locofy</span>
                    <span>.ai ...</span>
                  </div>
                </div>
              </div>
              <div className={styles.ytdVideoRendererDiv3}>
                <img
                  className={styles.athumbnailIcon}
                  alt=""
                  src="../athumbnail3@2x.png"
                />
                <div className={styles.div3}>
                  <div className={styles.divmeta}>
                    <div className={styles.figmaDesignToLiveWebsiteW}>
                      Figma Design to Live Website with Locofy.ai
                    </div>
                    <div className={styles.divmetadataLine}>
                      <div className={styles.kViewsDiv}>6.3K views</div>
                      <div className={styles.kViewsDiv}>• 3 months ago</div>
                    </div>
                  </div>
                  <div className={styles.divchannelInfo}>
                    <div className={styles.ytImgShadowDiv}>
                      <img
                        className={styles.gqvpuAg9wAYV3eMkh5UtoQkdvHiMGLIcon}
                        alt=""
                        src="../gqvpuag9wayv3emkh5utoqkdvhimgla2vtqebhu2rp0zcc1i4ta6opb90ysan3swuvbevm8s68ckc0x00ffffffnorj3@2x.png"
                      />
                    </div>
                    <div className={styles.kViewsDiv}>Locofy</div>
                  </div>
                  <div className={styles.inThisVideoYoullBeLearni}>
                    <span>{`In this video you'll be learning how to go from a popular Figma design template to a Live Website using `}</span>
                    <span className={styles.locofySpan}>Locofy</span>
                    <span>{`.ai! With `}</span>
                    <span className={styles.locofySpan}>Locofy</span>
                    <span>.ai ...</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {isMenuPopupOpen && (
        <PortalPopup placement="Top left" onOutsideClick={closeMenuPopup}>
          <Menu onClose={closeMenuPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default SearchResults;
