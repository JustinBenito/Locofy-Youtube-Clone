import { useState, useCallback, useEffect } from "react";
import Menu from "../components/Menu";
import styles from "./Homepage.module.css";
import { useNavigate } from "react-router-dom";
import { formatDistance } from 'date-fns'
import YoutubeSearchBar from "../components/YoutubeSearchBar";

const Homepage = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);
  const [isMenuPopupOpen, setMenuPopupOpen] = useState(false);
  const [videos, setVideos] = useState([])

  const openMenuPopup = useCallback(() => {
    setMenuPopupOpen(true);
  }, []);
  const navigate = useNavigate()

  const closeMenuPopup = useCallback(() => {
    setMenuPopupOpen(false);
  }, []);

  useEffect(() => {
    async function fetchVideos() {

      let Recommended = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=12&regionCode=IN&key=${process.env.REACT_APP_API_KEY}`).then(res => res.json());


      const getlogo = async (channel_id) => {
        var URL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channel_id}&key=${process.env.REACT_APP_API_KEY}`;
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
      let v = Recommended?.items;
      v = v.map(async item => {
        item.logo = await getlogo(item.snippet.channelId)
        return item
      })

      let finalList = await Promise.all(v).then((res) => {
        console.log(res)
        return res
      })

      setVideos(chunkArrayInGroups(finalList, 4))
    }

    fetchVideos();

  }, [])

  
  function chunkArrayInGroups(arr, size) {
    var myArray = [];
    for (var i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i + size));
    }
    return myArray;
  }

  return (
    <>
      <div className={styles.homepageDiv}>
      <YoutubeSearchBar
        svg="../svg.svg"
        ytdTopbarLogoRenderer="../ytdtopbarlogorenderer.svg"
        svg1="../svg1.svg"
        divvoiceSearchButton="../divvoicesearchbutton.svg"
        vector="../vector.svg"
        ytIconButton="../yticonbutton.svg"
        svg2="../svg2.svg"
      />
        
        <div className={styles.ytdBodyDiv}>
          <div className={styles.divsections}>
            <div className={styles.divitems}>
              <div className={styles.ytdGuideEntryRendererDiv}>
                <div className={styles.tpYtPaperItemDiv}>
                  <img className={styles.svgIcon3} alt="" src="../svg3.svg" />
                  <div className={styles.ytFormattedStringDiv}>
                    <div className={styles.homeDiv}>Home</div>
                  </div>
                </div>
              </div>
              <div className={styles.ytdGuideEntryRendererDiv1}>
                <div className={styles.tpYtPaperItemDiv}>
                  <img className={styles.svgIcon3} alt="" src="../svg4.svg" />
                  <div className={styles.ytFormattedStringDiv}>
                    <div className={styles.shortsDiv}>Shorts</div>
                  </div>
                </div>
              </div>
              <div className={styles.ytdGuideEntryRendererDiv2}>
                <div className={styles.tpYtPaperItemDiv}>
                  <img className={styles.svgIcon3} alt="" src="../svg5.svg" />
                  <div className={styles.ytFormattedStringDiv}>
                    <div className={styles.subscriptionsDiv}>Subscriptions</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.divitems1}>
              <div className={styles.ytdGuideEntryRendererDiv3}>
                <div className={styles.tpYtPaperItemDiv}>
                  <img className={styles.svgIcon3} alt="" src="../svg6.svg" />
                  <div className={styles.ytFormattedStringDiv}>
                    <div className={styles.libraryDiv}>Library</div>
                  </div>
                </div>
              </div>
              <div className={styles.ytdGuideEntryRendererDiv1}>
                <div className={styles.tpYtPaperItemDiv}>
                  <img className={styles.svgIcon3} alt="" src="../svg7.svg" />
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
                  <img className={styles.svgIcon2} alt="" src="../svg8.svg" />
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
                    <img className={styles.svgIcon3} alt="" src="../svg9.svg" />
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
                      src="../svg10.svg"
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
                      src="../svg11.svg"
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
                      src="../svg12.svg"
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
                      src="../svg13.svg"
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
                      src="../svg14.svg"
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
                      src="../svg15.svg"
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
                      src="../svg16.svg"
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
                      src="../svg17.svg"
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
                      src="../svg18.svg"
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
                <img className={styles.svgIcon3} alt="" src="../svg19.svg" />
                <div className={styles.ytFormattedStringDiv}>
                  <div className={styles.browseChannelsDiv}>
                    Browse channels
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.ytdRichGridRendererDiv}>
            <div className={styles.ironSelectorDiv}>
              <div className={styles.ytChipCloudChipRendererDiv}>
                <div className={styles.ytFormattedStringDiv16}>
                  <div className={styles.allDiv}>All</div>
                </div>
              </div>
              <div className={styles.ytChipCloudChipRendererDiv1}>
                <div className={styles.ytFormattedStringDiv17}>
                  <div className={styles.liveDiv1}>Live</div>
                </div>
              </div>
              <div className={styles.ytChipCloudChipRendererDiv2}>
                <div className={styles.ytFormattedStringDiv18}>
                  <div className={styles.gamingDiv1}>Gaming</div>
                </div>
              </div>
              <div className={styles.ytChipCloudChipRendererDiv3}>
                <div className={styles.ytFormattedStringDiv19}>
                  <div className={styles.laughterDiv}>Laughter</div>
                </div>
              </div>
              <div className={styles.ytChipCloudChipRendererDiv4}>
                <div className={styles.ytFormattedStringDiv20}>
                  <div className={styles.gadgetsDiv}>Gadgets</div>
                </div>
              </div>
              <div className={styles.ytChipCloudChipRendererDiv5}>
                <div className={styles.ytFormattedStringDiv21}>
                  <div className={styles.toolsDiv}>Tools</div>
                </div>
              </div>
              <div className={styles.ytChipCloudChipRendererDiv6}>
                <div className={styles.ytFormattedStringDiv22}>
                  <div className={styles.quarterbacksDiv}>Quarterbacks</div>
                </div>
              </div>
              <div className={styles.ytChipCloudChipRendererDiv7}>
                <div className={styles.ytFormattedStringDiv23}>
                  <div className={styles.comedyDiv}>Comedy</div>
                </div>
              </div>
              <div className={styles.ytChipCloudChipRendererDiv8}>
                <div className={styles.ytFormattedStringDiv24}>
                  <div className={styles.charactersDiv}>Characters</div>
                </div>
              </div>
              <div className={styles.ytChipCloudChipRendererDiv9}>
                <div className={styles.ytFormattedStringDiv25}>
                  <div className={styles.backgroundMusicDiv}>
                    Background music
                  </div>
                </div>
              </div>
              <div className={styles.ytChipCloudChipRendererDiv10}>
                <div className={styles.ytFormattedStringDiv26}>
                  <div className={styles.drivingDiv}>Driving</div>
                </div>
              </div>
              <div className={styles.ytChipCloudChipRendererDiv11}>
                <div className={styles.ytFormattedStringDiv27}>
                  <div className={styles.gameShowsDiv}>Game shows</div>
                </div>
              </div>
              <div className={styles.ytChipCloudChipRendererDiv12}>
                <div className={styles.ytFormattedStringDiv28}>
                  <div className={styles.historyDiv1}>History</div>
                </div>
              </div>
            </div>

            {videos?.length > 0 ? videos.map(groupVideos => {
              return <div className={styles.divcontents}>
                {groupVideos.map(video => <div key={video.id} onClick={() => {
                  navigate('/video-page', { state: video })
                }} className={styles.ytdCardDiv}>
                  <img
                    className={styles.ytdThumbnailIcon}
                    alt=""
                    src={video.snippet.thumbnails.high.url || "../ytdthumbnail@2x.png"}
                  />
                  <div className={styles.ytdDescriptionDiv}>
                    <img
                      className={styles.zMNvfKkJr08efLtSQQM53Qn7X3gYIcon}
                      alt=""
                      src={video.logo || "../8zmnvfkkjr08efltsqqm5-3qn7x3gy0ffr0dy6mqscdddxj1zfwnumsa4i8gwtvpdqkwbds68ckc0x00ffffffnorj@2x.png"}
                    />
                    <div className={styles.divmeta}>
                      <div className={styles.cOOLESTNewGadgetsAndInvent}>
                        {video.snippet.title}
                      </div>
                      <div className={styles.divmetadata}>
                        <div className={styles.tecHOWDiv}>{video.snippet.channelTitle}</div>
                        <div className={styles.divmetadataLine}>
                          <div className={styles.tecHOWDiv}>{video.statistics.viewCount > 1000 ? (Math.ceil(video.statistics.viewCount / 1000000)) + 'M' : video.statistics.viewCount}</div>
                          <div className={styles.tecHOWDiv}>•  {formatDistance(new Date(video.snippet.publishedAt), new Date(), { addSuffix: true })} </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>)}
              </div>
            }) : <div>Loading</div>
            }
            {/* <div className={styles.ytdCardDiv}>
                <img
                  className={styles.ytdThumbnailIcon}
                  alt=""
                  src="../ytdthumbnail@2x.png"
                />
                <div className={styles.ytdDescriptionDiv}>
                  <img
                    className={styles.zMNvfKkJr08efLtSQQM53Qn7X3gYIcon}
                    alt=""
                    src="../8zmnvfkkjr08efltsqqm5-3qn7x3gy0ffr0dy6mqscdddxj1zfwnumsa4i8gwtvpdqkwbds68ckc0x00ffffffnorj@2x.png"
                  />
                  <div className={styles.divmeta}>
                    <div className={styles.cOOLESTNewGadgetsAndInvent}>
                      10 COOLEST New Gadgets And Inventions YOU SHOULD HAVE!
                    </div>
                    <div className={styles.divmetadata}>
                      <div className={styles.tecHOWDiv}>TecHOW</div>
                      <div className={styles.divmetadataLine}>
                        <div className={styles.tecHOWDiv}>615 views</div>
                        <div className={styles.tecHOWDiv}>• 19 hours ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            {/* <div className={styles.ytdCardDiv}>
                <img
                  className={styles.ytdThumbnailIcon}
                  alt=""
                  src="../ytdthumbnail1@2x.png"
                />
                <div className={styles.ytdDescriptionDiv}>
                  <img
                    className={styles.zMNvfKkJr08efLtSQQM53Qn7X3gYIcon}
                    alt=""
                    src="../8zmnvfkkjr08efltsqqm5-3qn7x3gy0ffr0dy6mqscdddxj1zfwnumsa4i8gwtvpdqkwbds68ckc0x00ffffffnorj1@2x.png"
                  />
                  <div className={styles.divmeta}>
                    <div className={styles.cOOLESTNewGadgetsAndInvent}>
                      The New Youngest Self-Made Billionaire In The World Is A
                      25-
                    </div>
                    <div className={styles.divmetadata}>
                      <div className={styles.tecHOWDiv}>Forbes</div>
                      <div className={styles.divmetadataLine}>
                        <div className={styles.tecHOWDiv}>2M views</div>
                        <div className={styles.tecHOWDiv}>• 5 months ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.ytdCardDiv}>
                <img
                  className={styles.ytdThumbnailIcon}
                  alt=""
                  src="../ytdthumbnail2@2x.png"
                />
                <div className={styles.ytdDescriptionDiv}>
                  <img
                    className={styles.zMNvfKkJr08efLtSQQM53Qn7X3gYIcon}
                    alt=""
                    src="../8zmnvfkkjr08efltsqqm5-3qn7x3gy0ffr0dy6mqscdddxj1zfwnumsa4i8gwtvpdqkwbds68ckc0x00ffffffnorj2@2x.png"
                  />
                  <div className={styles.divmeta}>
                    <div className={styles.cOOLESTNewGadgetsAndInvent}>
                      lofi hip hop radio - beats to relax/study to
                    </div>
                    <div className={styles.divmetadata}>
                      <div className={styles.tecHOWDiv}>Lofi Girl</div>
                      <div className={styles.divmetadataLine}>
                        <div className={styles.tecHOWDiv}>8124 views</div>
                        <div className={styles.tecHOWDiv}>• 5 months ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.ytdCardDiv}>
                <img
                  className={styles.ytdThumbnailIcon}
                  alt=""
                  src="../ytdthumbnail3@2x.png"
                />
                <div className={styles.ytdDescriptionDiv}>
                  <img
                    className={styles.zMNvfKkJr08efLtSQQM53Qn7X3gYIcon}
                    alt=""
                    src="../8zmnvfkkjr08efltsqqm5-3qn7x3gy0ffr0dy6mqscdddxj1zfwnumsa4i8gwtvpdqkwbds68ckc0x00ffffffnorj3@2x.png"
                  />
                  <div className={styles.divmeta}>
                    <div
                      className={styles.cOOLESTNewGadgetsAndInvent}
                    >{`Baby Hippo Raised By Rhinos Meets A Hippo... ❤️ | The Dodo Go `}</div>
                    <div className={styles.divmetadata}>
                      <div className={styles.tecHOWDiv}>The Dodo</div>
                      <div className={styles.divmetadataLine}>
                        <div className={styles.tecHOWDiv}>4.3M views</div>
                        <div className={styles.tecHOWDiv}>• 3 days ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

          </div>
        </div>
      </div>
      {isMenuOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Left"
          onOutsideClick={closeMenu}
        >
          <Menu onClose={closeMenu} />
        </PortalDrawer>
      )}
    </>
  );
};

export default Homepage;


