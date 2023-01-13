import { formatDistance } from "date-fns";
import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Menu from "../components/Menu";
import PortalPopup from "../components/PortalPopup";
import styles from "./VideoPage.module.css";
import YoutubeSearchBar from "../components/YoutubeSearchBar";

const VideoPage = () => {
  const [isMenuPopupOpen, setMenuPopupOpen] = useState(false);
  const params = useLocation();
  let [video, setVideo] = useState({})
  
 
  let [relatedVideos, setRelatedVideos] = useState([])
  useEffect(() => {
    const { state } = params;
    async function getResults() {


      if (state?.id) {

        let related_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&relatedToVideoId=${state.id}&type=video&key=${process.env.REACT_APP_API_KEY}`;
        const result = await fetch(related_url, {
          method: "GET",
        }).then(async res => await res.json());

        const getlogo = async (channel_id) => {
          var URL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${channel_id}&key=${process.env.REACT_APP_API_KEY}`;
          const res = await fetch(URL, {
            method: "GET", //Method of https request
            headers: {},
          });
          //the resultant json is stored into the data
          const logodata = await res.json();
          let logo = logodata.items[0].snippet.thumbnails.default.url;
          // console.log(logo)
          return logo;
        };
        let v = result?.items;
        v = v.map(async item => {
          item.logo = await getlogo(item.snippet.channelId)
          return item
        })

        let finalList = await Promise.all(v).then((res) => {
          console.log(res)
          return res
        })

        const videoInfo = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${state.id}&key=${process.env.REACT_APP_API_KEY}&part=snippet,statistics`, {
          method: "GET",
        }).then(async res => await res.json());
        let videoChannelLogo = await getlogo(videoInfo.items[0].snippet.channelId)


        setVideo({
          ...videoInfo.items[0],
          logo: videoChannelLogo
        })

        setRelatedVideos(finalList)
      }
    }
    getResults();

  }, [])
  const openMenuPopup = useCallback(() => {
    setMenuPopupOpen(true);
  }, []);

  const closeMenuPopup = useCallback(() => {
    setMenuPopupOpen(false);
  }, []);

  return (
    <>
      <div className={styles.videoPageDiv}>
      <YoutubeSearchBar
        svg="../svg.svg"
        ytdTopbarLogoRenderer="../ytdtopbarlogorenderer.svg"
        svg1="../svg1.svg"
        divvoiceSearchButton="../divvoicesearchbutton.svg"
        vector="../vector.svg"
        ytIconButton="../yticonbutton.svg"
        svg2="../svg2.svg"
        
      />
        <div className={styles.divcolumns}>
          <div className={styles.divprimaryInner}>
            <div className={styles.youtubePlayerContainer}>
              <iframe
                className={styles.youTubeVideoPlayer}
                src={`https://www.youtube.com/embed/${video?.id}?rel=0`}
                frameBorder="0"
                allowFullScreen
              />
            </div>
            <div className={styles.divbelow}>
              <div className={styles.divaboveTheFold}>
                <div className={styles.divtitle}>
                  <div className={styles.locofyQuickBuilds}>
                    {video?.snippet?.title}
                  </div>
                  <div className={styles.figmaDesignToLiveWebsiteW}>
                    {video?.snippet?.title}
                  </div>
                </div>
                <div className={styles.divtopRow}>
                  <div className={styles.divstart}>
                    <div className={styles.ytdVideoOwnerRendererDiv}>
                      <div className={styles.ytImgShadowDiv}>
                        <img
                          className={styles.gqvpuAg9wAYV3eMkh5UtoQkdvHiMGLIcon}
                          alt=""
                          src={video?.logo}
                        />
                      </div>
                      <div className={styles.divuploadInfo}>
                        <div className={styles.kSubscribersDiv}>
                          <div className={styles.kSubscribersDiv1}>
                            1.22K subscribers
                          </div>
                        </div>
                        <div className={styles.divcontainer}>
                          <div className={styles.ytFormattedStringDiv}>
                            <div className={styles.aDiv1}>
                              <div className={styles.locofyDiv}> {video?.snippet?.channelTitle}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.ytdButtonRendererDiv1}>
                      <div className={styles.buttonDiv}>
                        <div className={styles.div1}>
                          <div className={styles.subscribeDiv}>Subscribe</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.ytdMenuRendererDiv}>
                    <div className={styles.divtopLevelButtonsComputed}>
                      <div className={styles.ytdSegmentedLikeDislikeButDiv}>
                        <div className={styles.ytdToggleButtonRendererDiv}>
                          <div className={styles.likeThisVideoAlongWith169}>
                            <img
                              className={styles.svgIcon1}
                              alt=""
                              src={"../svg44.svg"}
                            />
                            <div className={styles.div2}>{video?.statistics?.likeCount}</div>
                          </div>
                        </div>
                        <div className={styles.likeThisVideoAlongWith1691} />
                        <img
                          className={styles.ytdToggleButtonRendererIcon}
                          alt=""
                          src="../ytdtogglebuttonrenderer.svg"
                        />
                      </div>
                      <div className={styles.ytdButtonRendererDiv2}>
                        <div className={styles.shareDiv}>
                          <img
                            className={styles.svgIcon1}
                            alt=""
                            src="../svg45.svg"
                          />
                          <div className={styles.shareDiv1}>Share</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.ytdToggleButtonRendererDiv}>
                      <div className={styles.saveToPlaylist}>
                        <div className={styles.svgDiv}>
                          <img
                            className={styles.frameIcon}
                            alt=""
                            src="../frame.svg"
                          />
                        </div>
                        <div className={styles.saveDiv}>Save</div>
                      </div>
                    </div>
                    <img
                      className={styles.moreActionsIcon}
                      alt=""
                      src="../more-actions.svg"
                    />
                  </div>
                </div>
                <div className={styles.divdescription}>
                  <div className={styles.divdescriptionInner}>
                    <div className={styles.kViews3MonthsAgo}>
                      {(video?.statistics?.viewCount > 1000000 ? Math.ceil(video?.statistics?.viewCount / 1000000) + 'M' : video?.statistics?.viewCount)} views • {video?.snippet?.publishedAt ? formatDistance(new Date(video?.snippet?.publishedAt), new Date(), { addSuffix: true }) : null}
                    </div>
                    <div className={styles.inThisVideoYoullBeLearni}>
                      <p className={styles.blankLineP}>
                        <span>
                          {video?.snippet?.description?.substring(0, 250)}...
                        </span>
                      </p>
                      <p className={styles.blankLineP}>
                        <span>&nbsp;</span>
                      </p>

                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.div3} />
              <div className={styles.ytdItemSectionRendererDiv}>
                <div className={styles.ytdCommentsHeaderRendererDiv}>
                  <div className={styles.divtitle1}>
                    <div className={styles.commentsDiv}>{video?.statistics?.commentCount + ' comments'}</div>
                    <div className={styles.ytSortFilterSubMenuRenderDiv}>
                      <div className={styles.sortCommentsDiv}>
                        <img
                          className={styles.svgIcon5}
                          alt=""
                          src="../svg46.svg"
                        />
                        <div className={styles.sortByDiv}>Sort by</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.ytdCommentSimpleboxRendererDiv}>
                    <div className={styles.ytImgShadowDiv1}>
                      <img
                        className={styles.gqvpuAg9wAYV3eMkh5UtoQkdvHiMGLIcon}
                        alt=""
                        src="../defaultusers48ckc0x00ffffffnorj@2x.png"
                      />
                    </div>
                    <input
                      className={styles.frameInput}
                      type="text"
                      placeholder="Add a comment..."

                    />
                  </div>
                </div>
                <div className={styles.divcontents} />
              </div>
            </div>
          </div>
          <div className={styles.rightPanelDiv}>
            {
              relatedVideos.length > 0 ? relatedVideos.map(video => {
                return <div key={video?.id} className={styles.ytdCompactVideoRendererDiv}>
                  <div className={styles.divdismissible}>
                    <div className={styles.athumbnailDiv}>
                      <img
                        className={styles.hqdefaultjpgIcon}
                        alt=""
                        src={video.snippet.thumbnails.medium.url}
                      />

                    </div>
                    <div className={styles.div5}>
                      <div className={styles.div6}>
                        <div className={styles.aDiv2}>
                          <div className={styles.figmaDesignToLiveDashboard}>
                            <div className={styles.figmaDesignToLiveDashboard1} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {video?.snippet?.title?.length > 50 ? video?.snippet?.title.substring(0, 50) + '...' : video.snippet.title}
                            </div>
                          </div>
                          <div className={styles.div7}>
                            <div className={styles.divmetadata}>
                              <div className={styles.divbylineContainer}>
                                <div className={styles.divcontainer1}>
                                  <div className={styles.divbylineContainer}>
                                    <div className={styles.locofyDiv1}>{video.snippet.channelTitle}</div>
                                  </div>
                                </div>
                              </div>
                              <div className={styles.divmetadataLine}>
                                <div className={styles.kViews2MonthsAgo}>
                                  2.5K views •{video?.snippet?.publishedAt ? formatDistance(new Date(video?.snippet?.publishedAt), new Date(), { addSuffix: true }) : null}

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }) : null
            }

            {/* <div className={styles.ytdCompactVideoRendererDiv}>
              <div className={styles.divdismissible}>
                <div className={styles.athumbnailDiv}>
                  <img
                    className={styles.hqdefaultjpgIcon}
                    alt=""
                    src="../hqdefaultjpg@2x.png"
                  />
                  <div className={styles.ytdThumbnailOverlayTimeStaDiv}>
                    <div className={styles.minutes19Seconds}>
                      <div className={styles.div4}>50:19</div>
                    </div>
                  </div>
                </div>
                <div className={styles.div5}>
                  <div className={styles.div6}>
                    <div className={styles.aDiv2}>
                      <div className={styles.figmaDesignToLiveDashboard}>
                        <div className={styles.figmaDesignToLiveDashboard1}>
                          Figma design to live dashboard with Locofy.ai
                        </div>
                      </div>
                      <div className={styles.div7}>
                        <div className={styles.divmetadata}>
                          <div className={styles.divbylineContainer}>
                            <div className={styles.divcontainer1}>
                              <div className={styles.divbylineContainer}>
                                <div className={styles.locofyDiv1}>Locofy</div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.divmetadataLine}>
                            <div className={styles.kViews2MonthsAgo}>
                              2.5K views • 2 months ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.ytdCompactVideoRendererDiv}>
              <div className={styles.divdismissible}>
                <div className={styles.athumbnailDiv}>
                  <img
                    className={styles.hqdefaultjpgIcon}
                    alt=""
                    src="../hqdefaultjpg@2x.png"
                  />
                  <div className={styles.ytdThumbnailOverlayTimeStaDiv}>
                    <div className={styles.minutes19Seconds}>
                      <div className={styles.div4}>50:19</div>
                    </div>
                  </div>
                </div>
                <div className={styles.div5}>
                  <div className={styles.div6}>
                    <div className={styles.aDiv2}>
                      <div className={styles.figmaDesignToLiveDashboard}>
                        <div className={styles.figmaDesignToLiveDashboard1}>
                          Figma design to live dashboard with Locofy.ai
                        </div>
                      </div>
                      <div className={styles.div7}>
                        <div className={styles.divmetadata}>
                          <div className={styles.divbylineContainer}>
                            <div className={styles.divcontainer1}>
                              <div className={styles.divbylineContainer}>
                                <div className={styles.locofyDiv1}>Locofy</div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.divmetadataLine}>
                            <div className={styles.kViews2MonthsAgo}>
                              2.5K views • 2 months ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.ytdCompactVideoRendererDiv}>
              <div className={styles.divdismissible}>
                <div className={styles.athumbnailDiv}>
                  <img
                    className={styles.hqdefaultjpgIcon}
                    alt=""
                    src="../hqdefaultjpg@2x.png"
                  />
                  <div className={styles.ytdThumbnailOverlayTimeStaDiv}>
                    <div className={styles.minutes19Seconds}>
                      <div className={styles.div4}>50:19</div>
                    </div>
                  </div>
                </div>
                <div className={styles.div5}>
                  <div className={styles.div6}>
                    <div className={styles.aDiv2}>
                      <div className={styles.figmaDesignToLiveDashboard}>
                        <div className={styles.figmaDesignToLiveDashboard1}>
                          Figma design to live dashboard with Locofy.ai
                        </div>
                      </div>
                      <div className={styles.div7}>
                        <div className={styles.divmetadata}>
                          <div className={styles.divbylineContainer}>
                            <div className={styles.divcontainer1}>
                              <div className={styles.divbylineContainer}>
                                <div className={styles.locofyDiv1}>Locofy</div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.divmetadataLine}>
                            <div className={styles.kViews2MonthsAgo}>
                              2.5K views • 2 months ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.ytdCompactVideoRendererDiv}>
              <div className={styles.divdismissible}>
                <div className={styles.athumbnailDiv}>
                  <img
                    className={styles.hqdefaultjpgIcon}
                    alt=""
                    src="../hqdefaultjpg@2x.png"
                  />
                  <div className={styles.ytdThumbnailOverlayTimeStaDiv}>
                    <div className={styles.minutes19Seconds}>
                      <div className={styles.div4}>50:19</div>
                    </div>
                  </div>
                </div>
                <div className={styles.div5}>
                  <div className={styles.div6}>
                    <div className={styles.aDiv2}>
                      <div className={styles.figmaDesignToLiveDashboard}>
                        <div className={styles.figmaDesignToLiveDashboard1}>
                          Figma design to live dashboard with Locofy.ai
                        </div>
                      </div>
                      <div className={styles.div7}>
                        <div className={styles.divmetadata}>
                          <div className={styles.divbylineContainer}>
                            <div className={styles.divcontainer1}>
                              <div className={styles.divbylineContainer}>
                                <div className={styles.locofyDiv1}>Locofy</div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.divmetadataLine}>
                            <div className={styles.kViews2MonthsAgo}>
                              2.5K views • 2 months ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.ytdCompactVideoRendererDiv}>
              <div className={styles.divdismissible}>
                <div className={styles.athumbnailDiv}>
                  <img
                    className={styles.hqdefaultjpgIcon}
                    alt=""
                    src="../hqdefaultjpg@2x.png"
                  />
                  <div className={styles.ytdThumbnailOverlayTimeStaDiv}>
                    <div className={styles.minutes19Seconds}>
                      <div className={styles.div4}>50:19</div>
                    </div>
                  </div>
                </div>
                <div className={styles.div5}>
                  <div className={styles.div6}>
                    <div className={styles.aDiv2}>
                      <div className={styles.figmaDesignToLiveDashboard}>
                        <div className={styles.figmaDesignToLiveDashboard1}>
                          Figma design to live dashboard with Locofy.ai
                        </div>
                      </div>
                      <div className={styles.div7}>
                        <div className={styles.divmetadata}>
                          <div className={styles.divbylineContainer}>
                            <div className={styles.divcontainer1}>
                              <div className={styles.divbylineContainer}>
                                <div className={styles.locofyDiv1}>Locofy</div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.divmetadataLine}>
                            <div className={styles.kViews2MonthsAgo}>
                              2.5K views • 2 months ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.ytdCompactVideoRendererDiv}>
              <div className={styles.divdismissible}>
                <div className={styles.athumbnailDiv}>
                  <img
                    className={styles.hqdefaultjpgIcon}
                    alt=""
                    src="../hqdefaultjpg@2x.png"
                  />
                  <div className={styles.ytdThumbnailOverlayTimeStaDiv}>
                    <div className={styles.minutes19Seconds}>
                      <div className={styles.div4}>50:19</div>
                    </div>
                  </div>
                </div>
                <div className={styles.div5}>
                  <div className={styles.div6}>
                    <div className={styles.aDiv2}>
                      <div className={styles.figmaDesignToLiveDashboard}>
                        <div className={styles.figmaDesignToLiveDashboard1}>
                          Figma design to live dashboard with Locofy.ai
                        </div>
                      </div>
                      <div className={styles.div7}>
                        <div className={styles.divmetadata}>
                          <div className={styles.divbylineContainer}>
                            <div className={styles.divcontainer1}>
                              <div className={styles.divbylineContainer}>
                                <div className={styles.locofyDiv1}>Locofy</div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.divmetadataLine}>
                            <div className={styles.kViews2MonthsAgo}>
                              2.5K views • 2 months ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.ytdCompactVideoRendererDiv}>
              <div className={styles.divdismissible}>
                <div className={styles.athumbnailDiv}>
                  <img
                    className={styles.hqdefaultjpgIcon}
                    alt=""
                    src="../hqdefaultjpg@2x.png"
                  />
                  <div className={styles.ytdThumbnailOverlayTimeStaDiv}>
                    <div className={styles.minutes19Seconds}>
                      <div className={styles.div4}>50:19</div>
                    </div>
                  </div>
                </div>
                <div className={styles.div5}>
                  <div className={styles.div6}>
                    <div className={styles.aDiv2}>
                      <div className={styles.figmaDesignToLiveDashboard}>
                        <div className={styles.figmaDesignToLiveDashboard1}>
                          Figma design to live dashboard with Locofy.ai
                        </div>
                      </div>
                      <div className={styles.div7}>
                        <div className={styles.divmetadata}>
                          <div className={styles.divbylineContainer}>
                            <div className={styles.divcontainer1}>
                              <div className={styles.divbylineContainer}>
                                <div className={styles.locofyDiv1}>Locofy</div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.divmetadataLine}>
                            <div className={styles.kViews2MonthsAgo}>
                              2.5K views • 2 months ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.ytdCompactVideoRendererDiv}>
              <div className={styles.divdismissible}>
                <div className={styles.athumbnailDiv}>
                  <img
                    className={styles.hqdefaultjpgIcon}
                    alt=""
                    src="../hqdefaultjpg@2x.png"
                  />
                  <div className={styles.ytdThumbnailOverlayTimeStaDiv}>
                    <div className={styles.minutes19Seconds}>
                      <div className={styles.div4}>50:19</div>
                    </div>
                  </div>
                </div>
                <div className={styles.div5}>
                  <div className={styles.div6}>
                    <div className={styles.aDiv2}>
                      <div className={styles.figmaDesignToLiveDashboard}>
                        <div className={styles.figmaDesignToLiveDashboard1}>
                          Figma design to live dashboard with Locofy.ai
                        </div>
                      </div>
                      <div className={styles.div7}>
                        <div className={styles.divmetadata}>
                          <div className={styles.divbylineContainer}>
                            <div className={styles.divcontainer1}>
                              <div className={styles.divbylineContainer}>
                                <div className={styles.locofyDiv1}>Locofy</div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.divmetadataLine}>
                            <div className={styles.kViews2MonthsAgo}>
                              2.5K views • 2 months ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
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

export default VideoPage;
