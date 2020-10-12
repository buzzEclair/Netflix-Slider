import React, { useState, useEffect } from "react";
import "../Scss/NetflixSlider.scss";
import randomColor from "randomcolor";
import { GoChevronRight, GoChevronLeft } from "react-icons/go";

const NetflixSlider = ({ title }) => {
  // Datas
  const [list] = useState([
    { id: 0, title: "Tv show 0", color: randomColor() },
    { id: 1, title: "Tv show 1", color: randomColor() },
    { id: 2, title: "Tv show 2", color: randomColor() },
    { id: 3, title: "Tv show 3", color: randomColor() },
    { id: 4, title: "Tv show 4", color: randomColor() },
    { id: 5, title: "Tv show 5", color: randomColor() },
    { id: 6, title: "Tv show 6", color: randomColor() },
    { id: 7, title: "Tv show 7", color: randomColor() },
    { id: 8, title: "Tv show 8", color: randomColor() },
    { id: 9, title: "Tv show 9", color: randomColor() },
    { id: 10, title: "Tv show 10", color: randomColor() },
    { id: 11, title: "Tv show 11", color: randomColor() },
    { id: 12, title: "Tv show 12", color: randomColor() },
    { id: 13, title: "Tv show 13", color: randomColor() },
    { id: 14, title: "Tv show 14", color: randomColor() },
    { id: 15, title: "Tv show 15", color: randomColor() },
    { id: 16, title: "Tv show 16", color: randomColor() },
    { id: 17, title: "Tv show 17", color: randomColor() },
    { id: 18, title: "Tv show 18", color: randomColor() },
    { id: 19, title: "Tv show 19", color: randomColor() },
    { id: 20, title: "Tv show 20", color: randomColor() },
    { id: 21, title: "Tv show 21", color: randomColor() }
  ]);
  // Const
  const itemsViewPrimaryList = 8;
  const itemsHide = 6;
  const listLength = list.length;
  const listPage = Math.ceil(listLength / 6);
  const [handlePrev, setHandlePrev] = useState(false);
  //State - Pagination Indicator
  const [paginationRow, setPaginationRow] = useState(0);
  // State - List
  const [primaryList, setPrimaryList] = useState([]);
  const [secondList, setSecondList] = useState([]);
  const [thirdlist, setThirdlist] = useState([]);

  // State - Key to slice from $list
  const [primaryKey, setPrimaryKey] = useState({
    0: 0,
    1: 7
  });
  const [secondKey, setSecondKey] = useState({
    0: 7,
    1: 13
  });
  const [thirdKey, setThirdKey] = useState({
    0: 0,
    1: 0
  });

  // State - Style
  const [styleContent, setStyleContent] = useState();

  // Fetch data by slider part (center and next)
  const fetchSliderPart = () => {
    if (handlePrev === false) {
      setPrimaryList(list.slice(primaryKey[0], primaryKey[1]));
      setSecondList(list.slice(secondKey[0], secondKey[1]));
    }
  };

  const handleLeft = () => {
    // Pagingation Indicator
    const pagination = document.getElementsByClassName("pagination-indicator");
    console.log(pagination);
    const paginationChild = pagination[0].children;

    if (paginationRow > 0) {
      for (let x = 0; x < paginationChild.length; x++) {
        paginationChild[x].classList.remove("active");
      }
      const newPaginationRow = paginationRow - 1;
      setPaginationRow(newPaginationRow);
      paginationChild[newPaginationRow].classList.add("active");
    } else {
      for (let x = 0; x < paginationChild.length; x++) {
        paginationChild[x].classList.remove("active");
      }
      const newPaginationRow = 3;
      setPaginationRow(newPaginationRow);
      paginationChild[newPaginationRow].classList.add("active");
    }

    setStyleContent({
      transform: "translate3d(-16.6666667%, 0px, 0px)",
      transitionDuration: "1s"
    });

    // Primary List
    const tempPrimKey1 = primaryKey[0] + 2;
    const tempPrimKey0 = tempPrimKey1 - itemsViewPrimaryList;
    setPrimaryKey({ 0: tempPrimKey0, 1: tempPrimKey1 });

    // Second List
    const tempSecKey1 = tempPrimKey1;
    const tempSecKey0 = tempPrimKey1 + itemsHide;
    setSecondKey({ 0: tempSecKey1, 1: tempSecKey0 });

    // Third List
    const tempthirdKey0 = tempPrimKey0 - itemsHide;
    const tempthirdKey1 = tempPrimKey0;
    setThirdKey({ 0: tempthirdKey0, 1: tempthirdKey1 });

    setTimeout(() => {
      // Primary List
      if (tempPrimKey0 < 0) {
        const newkey = listLength + tempPrimKey0;
        const newArray = list.slice(newkey, listLength);
        const tempArray = newArray.concat(list.slice(0, tempPrimKey1));

        setPrimaryKey({ 0: newkey, 1: tempPrimKey1 });
        setPrimaryList(tempArray);
      } else if (tempPrimKey1 > listLength) {
        const newkey = tempPrimKey1 - listLength;
        const newArray = list.slice(tempPrimKey0, listLength);
        const tempArray = newArray.concat(list.slice(0, newkey));

        setPrimaryKey({ 0: tempPrimKey0, 1: newkey });
        setPrimaryList(tempArray);
      } else {
        setPrimaryList(list.slice(tempPrimKey0, tempPrimKey1));
      }

      // Second List
      if (tempSecKey0 > listLength && tempSecKey1 > listLength) {
        const newkey = tempSecKey0 - listLength;
        const newkey2 = tempSecKey1 - listLength;

        setSecondKey({ 0: newkey, 1: newkey2 });
        setSecondList(list.slice(newkey2, newkey));
      } else if (tempSecKey0 > listLength && tempSecKey1 < listLength) {
        const newkey = tempSecKey0 - listLength;
        const newArray = list.slice(tempSecKey1, listLength);
        const tempArray = newArray.concat(list.slice(0, newkey));
        setSecondKey({ 0: newkey, 1: tempSecKey1 });
        setSecondList(tempArray);
      } else {
        setSecondList(list.slice(tempSecKey1, tempSecKey0));
      }

      //Third List
      if (tempthirdKey0 < 0 && tempthirdKey1 < 0) {
        const newkey = listLength + tempthirdKey0;
        const newkey2 = listLength + tempthirdKey1;

        setThirdKey({ 0: newkey, 1: newkey2 });
        setThirdlist(list.slice(newkey, newkey2));
      } else if (tempthirdKey0 < 0 && tempthirdKey1 > 0) {
        const newkey = listLength + tempthirdKey0;
        const newArray = list.slice(newkey, listLength);
        const tempArray = newArray.concat(list.slice(0, tempthirdKey1));

        setThirdKey({ 0: newkey, 1: tempthirdKey1 });
        setThirdlist(tempArray);
      } else {
        setThirdlist(list.slice(tempthirdKey0, tempthirdKey1));
      }
      setStyleContent({ transform: "translate3d(-116.6666667%, 0px, 0px)" });
    }, 1000);
  };

  const handleNext = () => {
    if (handlePrev) {
      setStyleContent({
        transform: "translate3d(-216.6666667%, 0px, 0px)",
        transitionDuration: "1s"
      });
    } else {
      setHandlePrev(true);
      setStyleContent({
        transform: "translate3d(-100%, 0px, 0px)",
        transitionDuration: "1s"
      });
    }

    // Pagingation Indicator
    const pagination = document.getElementsByClassName("pagination-indicator");
    const paginationChild = pagination[0].children;

    if (paginationRow < listPage - 1) {
      for (let x = 0; x < paginationChild.length; x++) {
        paginationChild[x].classList.remove("active");
      }
      const newPaginationRow = paginationRow + 1;
      setPaginationRow(newPaginationRow);
      paginationChild[newPaginationRow].classList.add("active");
    } else {
      for (let x = 0; x < paginationChild.length; x++) {
        paginationChild[x].classList.remove("active");
      }
      const newPaginationRow = 0;
      setPaginationRow(newPaginationRow);
      paginationChild[newPaginationRow].classList.add("active");
    }

    // Primary List
    const tempPrimKey0 = primaryKey[1] - 2;
    const tempPrimKey1 = tempPrimKey0 + itemsViewPrimaryList;
    setPrimaryKey({ 0: tempPrimKey0, 1: tempPrimKey1 });

    // Second List
    const tempSecKey0 = tempPrimKey1;
    const tempSecKey1 = tempPrimKey1 + itemsHide;
    setSecondKey({ 0: tempSecKey0, 1: tempSecKey1 });

    // Third List
    const tempthirdKey0 = tempPrimKey0 - itemsHide;
    const tempthirdKey1 = tempPrimKey0;
    setThirdKey({ 0: tempthirdKey0, 1: tempthirdKey1 });

    setTimeout(() => {
      // Primary List
      if (tempPrimKey1 > listLength) {
        const newkey = tempPrimKey1 - listLength;
        const newArray = list.slice(tempPrimKey0, listLength);
        const tempArray = newArray.concat(list.slice(0, newkey));

        setPrimaryKey({ 0: tempPrimKey0, 1: newkey });
        setPrimaryList(tempArray);
      } else if (tempPrimKey0 < 0) {
        const newkey = listLength + tempPrimKey0;
        const newArray = list.slice(newkey, listLength);
        const tempArray = newArray.concat(list.slice(0, tempPrimKey1));

        setPrimaryKey({ 0: newkey, 1: tempPrimKey1 });
        setPrimaryList(tempArray);
      } else {
        setPrimaryList(list.slice(tempPrimKey0, tempPrimKey1));
      }

      // Second List
      if (tempSecKey1 > listLength && tempSecKey0 < listLength) {
        const newkey = tempSecKey1 - listLength;
        const newArray = list.slice(tempSecKey0, listLength);
        const tempArray = newArray.concat(list.slice(0, newkey));

        setSecondKey({ 0: tempSecKey0, 1: newkey });
        setSecondList(tempArray);
      } else if (tempSecKey0 > listLength && tempSecKey1 > listLength) {
        const newkey = tempSecKey0 - listLength;
        const newkey2 = tempSecKey1 - listLength;

        setSecondKey({ 0: newkey, 1: newkey2 });
        setSecondList(list.slice(newkey, newkey2));
      } else {
        setSecondList(list.slice(tempSecKey0, tempSecKey1));
      }

      // Third List
      if (tempthirdKey0 < 0 && tempthirdKey1 > 0) {
        const newkey = listLength + tempthirdKey0;
        const newArray = list.slice(newkey, listLength);
        const tempArray = newArray.concat(list.slice(0, tempthirdKey1));

        setThirdKey({ 0: newkey, 1: tempthirdKey1 });
        setThirdlist(tempArray);
      } else if (tempthirdKey0 < 0 && tempthirdKey1 < 0) {
        const newkey = listLength + tempthirdKey0;
        const newkey2 = listLength + tempthirdKey1;

        setThirdKey({ 0: newkey, 1: newkey2 });
        setThirdlist(list.slice(newkey, newkey2));
      } else {
        setThirdlist(list.slice(tempthirdKey0, tempthirdKey1));
      }
      setStyleContent({ transform: "translate3d(-116.6666667%, 0px, 0px)" });
    }, 1000);
  };

  const paginationIndicator = () => {
    let list = [];

    for (let z = 0; z < listPage; z++) {
      if (z === 0) {
        list.push(
          <li key={"paginationIndicator-" + z} className="active"></li>
        );
      } else {
        list.push(<li key={"paginationIndicator-" + z}></li>);
      }
    }

    return list;
  };

  // Call fetchSliderPart onComponentDidMout
  useEffect(() => {
    fetchSliderPart();
  }, []);

  return (
    <>
      <div className="netflix-slider">
        {/** Title part*/}
        <h2 className="netflix-slider-row-title">
          <span className="row-title" aria-label={title}>
            <div className="row-header-title">{title}</div>
          </span>
        </h2>
        {/** Container part*/}
        <div className="netflix-slider-row-container" id="row-1">
          <div className="netflix-slider-row-content">
            <div className="netflix-slider-slider">
              {/** button slider left */}
              {handlePrev && (
                <span
                  className="handle handlePrev active"
                  tabIndex="0"
                  role="button"
                  aria-label="Voir les titres précédents"
                  onClick={handleLeft}
                >
                  <GoChevronLeft />
                </span>
              )}

              {/** Container Pafination part*/}
              <ul className="pagination-indicator">{paginationIndicator()}</ul>
              {/** Container Show part*/}
              <div className="netflix-slider-slider-showpeek">
                <div
                  className="netflix-slider-slider-content"
                  style={styleContent}
                >
                  {/** Container next part*/}
                  {thirdlist.map((item, index) => (
                    <div key={item.id} className="netflix-slider-item">
                      <div className="netflix-slider-item-container">
                        <div className="netflix-slider-item-16x9">
                          <div
                            className="netflix-slider-item-img"
                            style={{ background: item.color }}
                          >
                            <p className="title">{item.title}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/** Container center part*/}
                  {primaryList.map((item, index) => (
                    <div
                      key={item.id}
                      className={
                        "netflix-slider-item netflix-slider-item-" + index + ""
                      }
                    >
                      <div className="netflix-slider-item-container">
                        <div className="netflix-slider-item-16x9">
                          <div
                            className="netflix-slider-item-img"
                            style={{ background: item.color }}
                          >
                            <p className="title">{item.title}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/** Container next part*/}
                  {secondList.map((item, index) => (
                    <div key={item.id} className="netflix-slider-item">
                      <div className="netflix-slider-item-container">
                        <div className="netflix-slider-item-16x9">
                          <div
                            className="netflix-slider-item-img"
                            style={{ background: item.color }}
                          >
                            <p className="title">{item.title}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/** button slider right */}
              <span
                className="handle handleNext active"
                tabIndex="0"
                role="button"
                aria-label="Voir les titres suivant"
                onClick={handleNext}
              >
                <GoChevronRight />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NetflixSlider;
