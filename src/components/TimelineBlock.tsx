import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { gsap } from 'gsap';

import { Event, Period } from '../types/timeline';

// ============= STYLED COMPONENTS =============

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    font-family: 'Inter', sans-serif;
    background-color: #f5f7fa;
    color: #333;
    border-radius: 16px;
`;

const Title = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: #2d3748;
    position: relative;
    padding-left: 20px;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background: linear-gradient(to bottom, #6366f1, #ec4899);
    }
`;

const CircleWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 40px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.div<{ rotation: number }>`
  width: 100%;
  height: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  transform: rotate(${props => props.rotation}deg);
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
`;

const NumberDisplay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const NumberCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
`;

const Number = styled.span`
  position: absolute;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateY(${props => props['data-offset'] * -100}%);
`;

const Dot = styled.div<{ active?: boolean; angle: number }>`
    position: absolute;
    width: 8px;
    height: 8px;
    background: ${props => props.active ? '#6366f1' : '#94a3b8'};
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(${props => props.angle}deg) translateX(150px);
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
    z-index: 2;

    &:hover {
        background: #6366f1;
        transform: translate(-50%, -50%) rotate(${props => props.angle}deg) translateX(150px) scale(1.3);
    }

    &::after {
        content: '';
        position: absolute;
        top: -12px;
        left: -12px;
        width: 24px;
        height: 24px;
        border: 1px solid #e2e8f0;
        border-radius: 50%;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover::after {
        opacity: 1;
    }
`;

const DotLabel = styled.span<{ active?: boolean }>`
    position: absolute;
    font-size: 0.8rem;
    font-weight: 500;
    color: ${props => props.active ? '#6366f1' : '#94a3b8'};
    white-space: nowrap;
    margin-top: 8px;
    margin-left: 12px;
    opacity: ${props => props.active ? 1 : 0.5};
    transform: ${props => props.active ? 'scale(1)' : 'scale(0.9)'};
    transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
    pointer-events: none;
`;

const YearDisplay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin: 30px 0;
    font-size: 5rem;
    font-weight: 700;
    letter-spacing: -4px;
    position: relative;
`;

const YearLeft = styled.span`
    color: #6366f1;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
    transform-origin: right center;
`;

const YearRight = styled.span`
    color: #ec4899;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
    transform-origin: left center;
`;

const Controls = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
`;

const ControlButton = styled.button`
    width: 40px;
    height: 40px;
    border: 1px solid #e2e8f0;
    border-radius: 50%;
    background: white;
    color: #64748b;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    &:hover {
        background: #f1f5f9;
        transform: scale(1.05);
    }
`;

const Indicator = styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
    margin: 10px 0;
`;

const IndicatorDot = styled.div<{ active: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => props.active ? '#6366f1' : '#e2e8f0'};
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        transform: scale(1.1);
    }
`;

const EventsContainer = styled.div`
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
`;

const EventCard = styled.div<{ isVisible?: boolean }>`
    flex: 1;
    min-width: 250px;
    padding: 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    opacity: ${props => props.isVisible ? 1 : 0};
    transform: ${props => props.isVisible ? 'translateY(0)' : 'translateY(20px)'};
    transition: opacity 0.5s ease, transform 0.5s ease;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
`;
const PeriodLabel = styled.span`
    position: absolute;
    font-size: 0.75rem;
    color: #2d3748;
    white-space: nowrap;
    top: -10px;
    right: 100px;
    transform: translateX(100px);
    z-index: 3;
`;

const PeriodNumber = styled.span`
  display: inline-block;
    
  width: 24px;
  height: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 50%;
  line-height: 24px;
  text-align: center;
  font-size: 0.75rem;
  color: #2d3748;
  margin-right: 8px;
  background: white;
    position: absolute;
    left: 80%;
    top: 10%;
    z-index: 3;
`;
const EventYear = styled.h4`
    color: #6366f1;
    font-size: 1rem;
    margin-bottom: 8px;
    font-weight: 600;
`;

const EventDescription = styled.p`
    font-size: 0.9rem;
    color: #4a5568;
    line-height: 1.5;
`;

const SwiperContainer = styled.div`
    width: 100%;
    margin-top: 20px;
`;

// ============= COMPONENT =============
const TimelineBlock: React.FC<{
    periods: Period[];
}> = ({ periods }) => {
    const [activePeriodIndex, setActivePeriodIndex] = useState(0);
    const [rotation, setRotation] = useState(0);
    const swiperRef = useRef<any>(null);
    const prevIndexRef = useRef(0);

    // Calculate angle for dot positioning
    const getAngle = (index: number, total: number) => {
        return (index * 360 / total) - 90; // -90 to start from top
    };

    const handleDotClick = useCallback((index: number) => {
        const diff = index - activePeriodIndex;
        const rotationDiff = diff * 90; // 90 degrees per item
        
        setRotation(prev => prev + rotationDiff);
        setActivePeriodIndex(index);
        prevIndexRef.current = index;
        
        if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.slideTo(index);
        }
    }, [activePeriodIndex]);

    const nextPeriod = () => {
        const nextIndex = (activePeriodIndex + 1) % periods.length;
        handleDotClick(nextIndex);
    };

    const prevPeriod = () => {
        const prevIndex = (activePeriodIndex - 1 + periods.length) % periods.length;
        handleDotClick(prevIndex);
    };

    // Главная анимация при смене периода
    useEffect(() => {
        const labels = document.querySelectorAll('.timeline-label');
        labels.forEach((label, i) => {
            if (i === activePeriodIndex) {
                gsap.to(label, { opacity: 1, duration: 0.4 });
            } else {
                gsap.to(label, { opacity: 0, duration: 0.3 });
            }
        });

        const dots = document.querySelectorAll('.timeline-dot');
        dots.forEach((dot, i) => {
            if (i === activePeriodIndex) {
                gsap.to(dot, { scale: 1.3, duration: 0.4 });
            } else {
                gsap.to(dot, { scale: 1, duration: 0.3 });
            }
        });
    }, [activePeriodIndex]);

    return (
        <Container>
            <TimelineWrapper>
                <Title>Исторические периоды</Title>

                <YearDisplay>
                    <YearLeft className="year-left">{periods[activePeriodIndex].startYear}</YearLeft>
                    <YearRight className="year-right">{periods[activePeriodIndex].endYear}</YearRight>
                </YearDisplay>

                <CircleWrapper>
                    <Circle rotation={rotation} />
                    
                    <NumberDisplay>
                        <NumberCircle>
                            {periods.map((period, idx) => (
                                <Number 
                                    key={period.id}
                                    data-offset={idx - activePeriodIndex}
                                >
                                    {period.id}
                                </Number>
                            ))}
                        </NumberCircle>
                    </NumberDisplay>

                    {periods.map((period, index) => {
                        const angle = getAngle(index, periods.length);
                        const isActive = index === activePeriodIndex;

                        return (
                            <React.Fragment key={`dot-${index}`}>
                                <Dot
                                    active={isActive}
                                    angle={angle}
                                    onClick={() => handleDotClick(index)}
                                />
                            </React.Fragment>
                        );
                    })}
                    <PeriodLabel>{periods[activePeriodIndex].name}</PeriodLabel>
                </CircleWrapper>

                <Controls>
                    <ControlButton onClick={prevPeriod}></ControlButton>
                    <Indicator>
                        {periods.map((_, index) => (
                            <IndicatorDot
                                key={index}
                                active={index === activePeriodIndex}
                                onClick={() => handleDotClick(index)}
                            />
                        ))}
                    </Indicator>
                    <ControlButton onClick={nextPeriod}></ControlButton>
                </Controls>

                <SwiperContainer>
                    <Swiper
                        ref={swiperRef}
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                        onSlideChange={(swiper) => {
                            setActivePeriodIndex(swiper.activeIndex);
                        }}
                        loop={false}
                        initialSlide={0}
                        speed={600}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                    >
                        {periods.map((period, index) => (
                            <SwiperSlide key={period.id}>
                                <EventsContainer>
                                    {period.events.map((event, i) => (
                                        <EventCard
                                            key={i}
                                            className="event-card"
                                            isVisible={index === activePeriodIndex}
                                        >
                                            <EventYear>{event.year}</EventYear>
                                            <EventDescription>{event.description}</EventDescription>
                                        </EventCard>
                                    ))}
                                </EventsContainer>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </SwiperContainer>
            </TimelineWrapper>
                <Swiper
                    ref={swiperRef}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    onSlideChange={(swiper) => {
                        setActivePeriodIndex(swiper.activeIndex);
                    }}
                    loop={false}
                    initialSlide={0}
                    speed={600}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                >
                    {periods.map((period, index) => (
                        <SwiperSlide key={period.id}>
                            <EventsContainer>
                                {period.events.map((event, i) => (
                                    <EventCard
                                        key={i}
                                        className="event-card"
                                        isVisible={index === activePeriodIndex}
                                    >
                                        <EventYear>{event.year}</EventYear>
                                        <EventDescription>{event.description}</EventDescription>
                                    </EventCard>
                                ))}
                            </EventsContainer>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </SwiperContainer>
        </Container>
    );
};

export default TimelineBlock;