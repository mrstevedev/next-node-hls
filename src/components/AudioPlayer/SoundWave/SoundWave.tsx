import { Fragment, useEffect } from "react";
import useDetectScreenWidth from "@/hooks/useDetectScreenWidth";

export default function SoundWave({ displayWave }: { displayWave: boolean }) {
  const widthSize = useDetectScreenWidth();
  const mobileWidth = 575;
  useEffect(() => {
    const bar = document.querySelectorAll<HTMLElement>(".bar");
    for (let i = 0; i < bar.length; i++) {
      bar.forEach((item, j) => {
        item.style.animationDuration = `${Math.random() * (0.7 - 0.2) + 0.2}s`; // Change the numbers for speed / ( max - min ) + min / ex. ( 0.5 - 0.1 ) + 0.1
      });
    }
  }, [displayWave]);

  const generateSoundWavesDesktop = () => {
    let divs: any = [];
    for (let i = 1; i <= 512; i++) {
      divs.push(<div className="bar" key={i}></div>);
    }
    return divs;
  };

  const generateSoundWavesMobile = () => {
    let divs: any = [];
    for (let i = 1; i <= 139; i++) {
      divs.push(<div className="bar" key={i}></div>);
    }
    return divs;
  };

  return (
    <Fragment>
      {displayWave ? (
        <Fragment>
          {widthSize > mobileWidth ? (
            <div className="sound-wave-desktop">
              {generateSoundWavesDesktop()}
            </div>
          ) : (
            <div className="sound-wave-mobile">
              {generateSoundWavesMobile()}
            </div>
          )}
        </Fragment>
      ) : null}
    </Fragment>
  );
}
