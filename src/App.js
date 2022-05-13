import "./App.css";
import { useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import PageSlider from "./PageSlider";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const Pagination = ({ currentPage, setPage }) => {
  // Wrap all the pagination Indicators
  // with AnimateSharedPresence
  // so we can detect when Indicators
  // with a layoutId are removed/added
  return (
    <AnimateSharedLayout>
      <div className='Indicators'>
        {pages.map((page) => (
          <Indicator
            key={page}
            onClick={() => setPage(page)}
            isSelected={page === currentPage}
          />
        ))}
      </div>
    </AnimateSharedLayout>
  );
};
const Indicator = ({ isSelected, onClick }) => {
  return (
    <div className='Indicator-container' onClick={onClick}>
      <div className='Indicator'>
        {isSelected && (
          // By setting layoutId, when this component
          // is removed and a new one is added elsewhere,
          // the new component will animate out from the old one.
          <motion.div className='Indicator-highlight' layoutId='highlight' />
        )}
      </div>
    </div>
  );
};
const pages = [0, 1, 2, 3, 4];
function App() {
  const [[currentPage, direction], setCurrentPage] = useState([0, 0]);

  function setPage(newPage, newDirection) {
    if (!newDirection) newDirection = newPage - currentPage;
    setCurrentPage([newPage, newDirection]);
  }
  return (
    <div className='App'>
      {/* <Carousel /> */}
      <div className='left'>
        <ArrowBackIosIcon
          style={{ fontSize: 30 }}
          onClick={() => currentPage > 0 && setPage(currentPage - 1)}
        />
      </div>
      <PageSlider
        currentPage={currentPage}
        direction={direction}
        setPage={setPage}
      />
      <div className='right'>
        <ArrowForwardIosIcon
          style={{ fontSize: 30 }}
          onClick={() =>
            currentPage < pages.length - 1 && setPage(currentPage + 1)
          }
        />
      </div>
      <Pagination currentPage={currentPage} setPage={setPage} />
    </div>
  );
}

export default App;
