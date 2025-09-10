import styled from 'styled-components';
import React, { useState, useEffect, useRef, FC, useCallback } from 'react';

import {Period} from "../types/timeline";
// Стили из оригинального CSS
const Desktop = styled.div`
  align-items: start;
  background-color: #ffffff;
  display: grid;
  justify-items: center;
  width: 100vw;
`;

const OverlapGroupWrapper = styled.div`
  background-color: #ffffff;
  height: 1080px;
  width: 1920px;
`;

const OverlapGroup = styled.div`
  background-image: url(https://c.animaapp.com/N6G9vLA5/img/rectangle-1.png);
  background-size: 100% 100%;
  height: 1080px;
  position: relative;
`;

const Group = styled.img`
  height: 1080px;
  left: 316px;
  position: absolute;
  top: 0;
  width: 1449px;
`;

const Element = styled.p`
  color: transparent;
  font-family: "PT Sans", Helvetica;
  font-size: 200px;
  font-weight: 700;
  left: 537px;
  letter-spacing: -4.00px;
  line-height: 160px;
  position: absolute;
  text-align: center;
  top: 399px;
  white-space: nowrap;
`;

const TextWrapper = styled.span`
  color: #5d5fef;
  letter-spacing: -8.00px;
`;

const Span = styled.span`
  color: #ef5da8;
  letter-spacing: -8.00px;
`;

const MaskGroup = styled.img`
  height: 530px;
  left: 772px;
  position: absolute;
  top: 215px;
  width: 536px;
`;

const Div = styled.div`
  color: var(--black-blue);
  font-family: "PT Sans", Helvetica;
  font-size: 20px;
  font-weight: 700;
  left: 1196px;
  letter-spacing: 0;
  line-height: 30px;
  position: absolute;
  top: 227px;
  white-space: nowrap;
`;

const Group2 = styled.div`
  height: 135px;
  left: 400px;
  position: absolute;
  top: 841px;
  width: 324px;
`;

const P = styled.p`
  color: var(--black-blue);
  font-family: "PT Sans", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 0;
  letter-spacing: 0;
  line-height: 30px;
  position: absolute;
  top: 45px;
  width: 320px;
`;

const TextWrapper2 = styled.div`
  color: var(--i-1n-2t-6);
  font-family: "Bebas Neue", Helvetica;
  font-size: 25px;
  font-weight: 400;
  left: 0;
  letter-spacing: 0;
  line-height: 30.0px;
  position: absolute;
  top: 0;
  white-space: nowrap;
`;

const Group3 = styled.div`
  height: 135px;
  left: 800px;
  position: absolute;
  top: 841px;
  width: 404px;
`;

const TextWrapper3 = styled.p`
  color: var(--black-blue);
  font-family: "PT Sans", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 0;
  letter-spacing: 0;
  line-height: 30px;
  position: absolute;
  top: 45px;
  width: 400px;
`;

const EllipseWrapper = styled.div`
  height: 56px;
  left: 1120px;
  position: absolute;
  top: 215px;
  transform: rotate(90.00deg);
  width: 56px;
`;

const Ellipse = styled.div`
  background-color: #f4f5f9;
  border: 1px solid;
  border-color: #303e5880;
  border-radius: 28px;
  height: 56px;
  transform: rotate(-270.00deg);
`;

const TextWrapper4 = styled.div`
  color: var(--black-blue);
  font-family: "PT Sans", Helvetica;
  font-size: 56px;
  font-weight: 700;
  left: 400px;
  letter-spacing: 0;
  line-height: 67.2px;
  position: absolute;
  top: 169px;
  width: 353px;
`;

const Vector = styled.img`
  height: 120px;
  left: 320px;
  position: absolute;
  top: 177px;
  width: 5px;
`;

const Group4 = styled.div`
  height: 135px;
  left: 1280px;
  position: absolute;
  top: 841px;
  width: 324px;
`;

const TextWrapper5 = styled.div`
  color: var(--black-blue);
  font-family: "PT Sans", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 1143px;
  letter-spacing: 0;
  line-height: 30px;
  position: absolute;
  top: 227px;
  white-space: nowrap;
    background-color: white;
    z-index: 10;
    
`;

const Ellipse2 = styled.div`
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 0px 15px #3877ee1a;
  height: 40px;
  left: 1680px;
  position: absolute;
  top: 882px;
  width: 40px;
    z-index: 10;
`;

const Img = styled.img`
  height: 11px;
  left: 1697px;
  position: absolute;
  top: 896px;
  width: 7px;
`;

const Group5 = styled.div`
  height: 88px;
  left: 400px;
  position: absolute;
  top: 697px;
  width: 122px;
`;

const TextWrapper6 = styled.div`
  color: #42557a;
  font-family: "PT Sans", Helvetica;
  font-size: 14px;
  font-weight: 400;
  left: 0;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 0;
`;

const Group6 = styled.img`
  height: 50px;
  left: 0;
  position: absolute;
  top: 38px;
  width: 50px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const Group7 = styled.img`
  height: 50px;
  left: 70px;
  position: absolute;
  top: 38px;
  width: 50px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

// Navigation Buttons
const NavButton = styled.button<{ disabled?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.3s ease;
  z-index: 20;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover:not(:disabled) {
    background: #f8fafc;
    transform: translateY(-50%) scale(1.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3);
  }
`;

const PrevButton = styled(NavButton)`
  left: 750px;
`;

const NextButton = styled(NavButton)`
  right: 750px;
`;

const ButtonIcon = styled.span`
  display: block;
  width: 12px;
  height: 12px;
  border-top: 2px solid #5D5FEF;
  border-right: 2px solid #5D5FEF;
`;

const PrevIcon = styled(ButtonIcon)`
  transform: rotate(-135deg);
  margin-right: 2px;
`;

const NextIcon = styled(ButtonIcon)`
  transform: rotate(45deg);
  margin-left: 2px;
`;

// Styled Components для анимаций
const RotatingWheel = styled.div<{ rotation: number }>`
  position: absolute;
  width: 530px;
  height: 530px;
    left: 54%;
    top: 45%;
  margin-left: -265px;
  margin-top: -265px;
  display: flex;
  justify-content: center;
  align-items: center;
  will-change: transform;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  z-index: 10;
  transform: rotate(${props => props.rotation}deg);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`;

const CircleWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Circle = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  position: relative;
  transition: border-color 0.3s ease;
`;

const Dot = styled.div<{ active?: boolean; angle: number }>`
  position: absolute;
  width: ${props => props.active ? '12px' : '8px'};
  height: ${props => props.active ? '12px' : '8px'};
  background: ${props => props.active ? '#5D5FEF' : '#94a3b8'};
  border-radius: 50%;
  top: 50%;
  left: 50%;
  margin-top: -4px;
  margin-left: -4px;
  cursor: pointer;
  z-index: 2;
  transform: 
    rotate(${props => props.angle}deg) 
    translateY(-250px) 
    rotate(-${props => props.angle}deg);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: ${props => props.active ? '0 0 0 6px rgba(93, 95, 239, 0.2)' : 'none'};
  
  &:hover {
    transform: 
      rotate(${props => props.angle}deg) 
      translateY(-250px) 
      rotate(-${props => props.angle}deg) 
      scale(1.5);
  }
`;

interface TimelineBlockProps {
    periods: Period[];
}

export const TimelineBlock: React.FC<TimelineBlockProps> = ({ periods }) => {

    const [activePeriodIndex, setActivePeriodIndex] = useState(0);
    const [wheelRotation, setWheelRotation] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const leftYearRef = useRef<HTMLSpanElement>(null);
    const rightYearRef = useRef<HTMLSpanElement>(null);

    // Функция анимации чисел
    const animateNumber = (
        ref: React.RefObject<HTMLSpanElement>,
        from: number,
        to: number,
        duration: number = 800
    ) => {
        if (!ref.current) return;

        const startTime = performance.now();
        const change = to - from;

        const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const value = (elapsed / duration) * change + from;

            if (elapsed < duration && ref.current) {
                ref.current.textContent = Math.round(value).toString();
                requestAnimationFrame(step);
            } else {
                if (ref.current) {
                    ref.current.textContent = to.toString();
                }
            }
        };

        requestAnimationFrame(step);
    };

    // Эффект для анимации при смене периода
    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false);
                animateNumber(leftYearRef, 0, periods[0].startYear, 1000);
                animateNumber(rightYearRef, 0, periods[0].endYear, 1000);
            }, 800);
            return () => clearTimeout(timer);
        } else {
            const prevIndex = (activePeriodIndex - 1 + periods.length) % periods.length;
            const fromLeft = periods[prevIndex]?.startYear || periods[activePeriodIndex].startYear;
            const fromRight = periods[prevIndex]?.endYear || periods[activePeriodIndex].endYear;

            animateNumber(leftYearRef, fromLeft, periods[activePeriodIndex].startYear);
            animateNumber(rightYearRef, fromRight, periods[activePeriodIndex].endYear);
        }
    }, [activePeriodIndex, isLoading]);

    // Вращение колеса при смене активного периода
    useEffect(() => {
        const angles = [60, 120, 240, 315];
        const angle = angles[activePeriodIndex % angles.length];
        let rotation = 355 - angle;
        if (activePeriodIndex == 3){
            rotation -=15;
        }else{
            rotation = 355 - angle;
        }
        console.log(activePeriodIndex + " " + rotation);
        if (activePeriodIndex == 3) {
            rotation = rotation + 360;
        }
        if (activePeriodIndex == 4) {
            rotation = rotation + 360;
        }

        setWheelRotation(rotation);
    }, [activePeriodIndex]);

    const handleDotClick = useCallback((index: number) => {
        setActivePeriodIndex(index);
    }, []);

    const goToNextPeriod = useCallback(() => {
        setActivePeriodIndex(prev => (prev + 1) % periods.length);
    }, [periods.length]);

    const goToPrevPeriod = useCallback(() => {
        setActivePeriodIndex(prev => (prev - 1 + periods.length) % periods.length);
    }, [periods.length]);

    const currentPeriod = periods[activePeriodIndex];

    return (
        <Desktop data-model-id="1:8">
            <OverlapGroupWrapper>
                <OverlapGroup>
                    <Group
                        alt="Group"
                        src="https://c.animaapp.com/N6G9vLA5/img/group-3048.png"
                    />

                    {!isLoading && (
                        <Element>
                            <TextWrapper ref={leftYearRef}>{currentPeriod.startYear}</TextWrapper>
                            <Span ref={rightYearRef}>{currentPeriod.endYear}</Span>
                        </Element>
                    )}

                    {/*<MaskGroup*/}
                    {/*    alt="Mask group"*/}
                    {/*    src="https://c.animaapp.com/N6G9vLA5/img/mask-group.png"*/}
                    {/*/>*/}

                    <Div>{currentPeriod.name}</Div>

                    <Group2>
                        <P>
                            {currentPeriod.events[0]?.description}
                        </P>
                        <TextWrapper2>{currentPeriod.events[0]?.year}</TextWrapper2>
                    </Group2>

                    <Group3>
                        <TextWrapper2>{currentPeriod.events[1]?.year}</TextWrapper2>
                        <TextWrapper3>
                            {currentPeriod.events[1]?.description}
                        </TextWrapper3>
                    </Group3>

                    <EllipseWrapper>
                        <Ellipse />
                    </EllipseWrapper>

                    <TextWrapper4>
                        Исторические
                        <br />
                        даты
                    </TextWrapper4>

                    <Vector
                        alt="Vector"
                        src="https://c.animaapp.com/N6G9vLA5/img/vector-17.svg"
                    />

                    <Group4>
                        <P>
                            {currentPeriod.events[2]?.description}
                        </P>
                        <TextWrapper2>{currentPeriod.events[2]?.year}</TextWrapper2>
                    </Group4>

                    <TextWrapper5>{currentPeriod.id}</TextWrapper5>

                    <Ellipse2 />

                    <Img
                        alt="Vector"
                        src="https://c.animaapp.com/N6G9vLA5/img/vector-2.svg"
                    />

                    {/* Анимированный круг и точки */}
                    <RotatingWheel rotation={wheelRotation}>
                        <CircleWrapper>
                            <Circle />
                        </CircleWrapper>
                        {/* Точки периода */}
                        {periods.map((period, index) => {
                            // Углы для 4 точек по кругу (смещение на 90 градусов, чтобы начать справа)
                            const angles = [0, 90, 180, 270].map(angle => angle + 90);
                            const angle = angles[index % angles.length];
                            const isActive = index === activePeriodIndex;

                            return (
                                <Dot
                                    key={`dot-${index}`}
                                    active={isActive}
                                    angle={angle}
                                    onClick={() => handleDotClick(index)}
                                />
                            );
                        })}
                    </RotatingWheel>

                    <Group5>
                        <TextWrapper6>{`0${activePeriodIndex + 1}/0${periods.length}`}</TextWrapper6>
                        <Group6
                            alt="Previous"
                            src="https://c.animaapp.com/N6G9vLA5/img/group-3277@2x.png"
                            onClick={goToPrevPeriod}
                            style={{ 
                                cursor: activePeriodIndex === 0 ? 'not-allowed' : 'pointer',
                                opacity: activePeriodIndex === 0 ? 0.5 : 1,
                                pointerEvents: activePeriodIndex === 0 ? 'none' : 'auto'
                            }}
                        />
                        <Group7
                            alt="Next"
                            src="https://c.animaapp.com/N6G9vLA5/img/group-3276@2x.png"
                            onClick={goToNextPeriod}
                            style={{ 
                                cursor: activePeriodIndex === periods.length - 1 ? 'not-allowed' : 'pointer',
                                opacity: activePeriodIndex === periods.length - 1 ? 0.5 : 1,
                                pointerEvents: activePeriodIndex === periods.length - 1 ? 'none' : 'auto',
                                left: '70px' // Ensure proper positioning
                            }}
                        />
                    </Group5>
                </OverlapGroup>
            </OverlapGroupWrapper>
        </Desktop>
    );
};