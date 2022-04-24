import { Box, Slider } from '@mui/material';
import React from 'react'
import { DateTime } from 'luxon';
import { GlobalContext } from '../../contexts/Contexts';


const minDistance = 10;

interface Props {
  startDate: Date,
  endDate: Date,
  onDaterangeChanged?: (startDate: Date, endDate: Date) => void,
  width?: number,
  height?: number,
};

const getDateString = (date: Date): string => {
  const dt = DateTime.fromJSDate(date);
  const dateStr: string = dt.toFormat('yyyy/MM/dd hh:mm:ss');
  return dateStr;
}

const valueToDateText = (value: number) => {
  return getDateString(new Date(value));
}

const DatetimeRangeSlider: React.FC<Props> = (props: Props) => {
  const gContextValue = React.useContext(GlobalContext);

  const [selectedDateRange, setSelectedDateRange] = React.useState<number[]>(
    [props.startDate.getTime(), props.endDate.getTime()]
  );

  const handleValueChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setSelectedDateRange(
        [Math.min(newValue[0], selectedDateRange[1] - minDistance), selectedDateRange[1]]
      );
    } else {
      setSelectedDateRange(
        [selectedDateRange[0], Math.max(newValue[1], selectedDateRange[0] + minDistance)]
      );
    }
  };

  const marks = [...Array(4)].map((v, idx) => {
    const interval = props.endDate.getTime() - props.startDate.getTime()
    const timestampOffset = (idx*interval/3);
    const timestamp = props.startDate.getTime() + timestampOffset
    const date = new Date(timestamp);
    return {
      value: timestamp,
      label: getDateString(date)
    }
  })
  console.log(marks)

  return (
    <Box sx={{ width: props.width ? props.width : 600 }}>
      a
      <Slider
        // getAriaLabel={() => 'Minimum distance shift'}
        value={selectedDateRange}
        onChange={handleValueChange}
        valueLabelDisplay="auto"
        aria-label="Small"
        getAriaValueText={valueToDateText}
        valueLabelFormat={valueToDateText}
        step={1000}
        min={props.startDate.getTime()}
        max={props.endDate.getTime()}
        marks={marks}
        disableSwap
      />
    </Box>
  );
};

export default DatetimeRangeSlider;
