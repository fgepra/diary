import Button from '../components/Button';
import Header from './Header';
import { useState, useContext, useEffect } from 'react';
import { DiaryStateContext } from '../App';
import { getMonthRangeByDate } from '../utils';
import DiaryList from '../components/DiaryList';

const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);

  const headerTitle = `${pivotDate.getFullYear()}년 
                        ${pivotDate.getMonth() + 1}월`;

  useEffect(() => {
    if (data && data.length >= 1) {
      const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
      setFilteredData(
        data.filter((it) => beginTimeStamp <= it.date && it.date <= endTimeStamp)
      );
    }
  }, [data, pivotDate]);

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1))
  };

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1))
  };

  return (
    <div>
      <Header
        title={headerTitle}
        leftChild={
          <Button
            text={"<"}
            onClick={onDecreaseMonth}
          />
        }
        rightChild={
          <Button
            text={">"}
            onClick={onIncreaseMonth}
          />
        }
      />
      <DiaryList data={filteredData} />
    </div>
  );
};

export default Home;
