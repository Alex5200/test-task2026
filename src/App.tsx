import React from 'react';
import TimelineBlock from './components/TimelineBlock';
import './styles/global.css';
import { Period } from './types/timeline';

const App: React.FC = () => {
    const periods: Period[] = [
        {
            id: 1,
            name: 'Технологии',
            startYear: 2015,
            endYear: 2017,
            events: [
                { year: '2015', title: 'Солнечное затмение', description: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды' },
                { year: '2016', title: 'Галактика GN-211', description: 'Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-211' },
                { year: '2017', title: 'Tesla Semi', description: 'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi' }
            ]
        },
        {
            id: 2,
            name: 'Наука',
            startYear: 2018,
            endYear: 2020,
            events: [
                { year: '2018', title: 'CRISPR', description: 'Первые успешные испытания CRISPR в медицине' },
                { year: '2019', title: 'Марс', description: 'Зонд "InSight" успешно приземлился на Марс' },
                { year: '2020', title: 'Пандемия', description: 'Начало глобальной пандемии COVID-19' }
            ]
        },
        {
            id: 3,
            name: 'Космос',
            startYear: 2021,
            endYear: 2022,
            events: [
                { year: '2021', title: 'Артемиды', description: 'Старт программы Artemis по возвращению на Луну' },
                { year: '2022', title: 'Starlink', description: 'Запуск сотен спутников Starlink для глобального интернета' }
            ]
        },
        {
            id: 4,
            name: 'Техника',
            startYear: 2021,
            endYear: 2022,
            events: [
                { year: '2021', title: 'Артемиды', description: 'Старт программы Artemis по возвращению на Луну' },
                { year: '2022', title: 'Starlink', description: 'Запуск сотен спутников Starlink для глобального интернета' }
            ]
        }
    ];

    return (
        <div>
            <TimelineBlock periods={periods} />
        </div>
    );
};

export default App;