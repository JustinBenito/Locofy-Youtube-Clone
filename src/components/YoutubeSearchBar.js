import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import PortalPopup from "../components/PortalPopup";
import styles from "./YoutubeSearchBar.module.css";

const YoutubeSearchBar = ({
  svg,
  ytdTopbarLogoRenderer,
  svg1,
  divvoiceSearchButton,
  vector,
  ytIconButton,
  svg2,
  onClick
}) => {
  const [isMenuPopupOpen, setMenuPopupOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const openMenuPopup = useCallback(() => {
    setMenuPopupOpen(true);
  }, []);

  const closeMenuPopup = useCallback(() => {
    setMenuPopupOpen(false);
  }, []);
  function handleSearchClick() {
    if (onClick) {
      onClick(searchValue)
    } else
      navigate('/search-results', { state: { searchTerm: searchValue } })
  }

  return (
    <>
      <nav className={styles.ytdMastheadNav}>
        <div className={styles.divstart}>
          <button className={styles.ytIconButton} onClick={openMenuPopup}>
            <img className={styles.svgIcon} alt="" src={svg} />
          </button>
          <img
            className={styles.ytdTopbarLogoRendererIcon}
            alt=""
            src={ytdTopbarLogoRenderer}
          />
        </div>
        <div className={styles.divcenter}>
          <div className={styles.ytdSearchboxDiv}>
            <input
              className={styles.divcontainerInput}
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <button className={styles.searchButton} onClick={handleSearchClick} autoFocus>
              <img className={styles.svgIcon1} alt="" src={svg1} />
            </button>
          </div>
          <img
            className={styles.divvoiceSearchButtonIcon}
            alt=""
            src={divvoiceSearchButton}
          />
        </div>
        <div className={styles.divbuttons}>
          <button className={styles.svgButton}>
            <img className={styles.vectorIcon} alt="" src={vector} />
          </button>
          <img className={styles.ytIconButton1} alt="" src={ytIconButton} />
          <div className={styles.ytdButtonRendererDiv}>
            <div className={styles.aDiv}>
              <img className={styles.svgIcon2} alt="" src={svg2} />
              <div className={styles.div}>
                <div className={styles.signInDiv}>Sign in</div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isMenuPopupOpen && (
        <PortalPopup placement="Top left" onOutsideClick={closeMenuPopup}>
          <Menu onClose={closeMenuPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default YoutubeSearchBar;
