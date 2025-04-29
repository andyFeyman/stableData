import CountDownSection from './CountDown.jsx';
import { useState, useEffect } from 'react';

function CountFromLastATH() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // 设置目标日期
    const targetDate = new Date('2025-10-20T23:59:59').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setDays(d);
        setHours(h);
        setMinutes(m);
        setSeconds(s);
      } else {
        // 倒计时结束
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    };

    // 初始更新
    updateCountdown();

    // 每秒更新一次
    const intervalId = setInterval(updateCountdown, 1000);
    //console.log({days,hours,minutes,seconds});
    
    // 清理 interval
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <CountDownSection days={days} hours={hours} minutes={minutes} seconds={seconds} />
    </div>
  );
}

export default CountFromLastATH;
