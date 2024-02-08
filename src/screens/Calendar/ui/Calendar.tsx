import { FC, useEffect, useState } from 'react';
import { Calendar, EventProps, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Toolbar from '../Toolbar/Toolbar.tsx';
import style from './Calendar.module.scss';
import Layout from '../../../components/Layout/ui/Layout.tsx';
import NewEventForm from '../NewEventForm/NewEventForm.tsx';
import { useAppSelector } from '../../../hooks/hooks.ts';
import { getCoursesByDate } from '../../../store/selectors/coursesByDateSelector.ts';

interface EventSchema {
	start?: Date;
	end?: Date;
	title?: string;
	count?: number;
}

const localizer = momentLocalizer(moment);

const EventComponent: FC<EventProps> = ({ event }) => {
	const onClickHandler = () => {
		console.log('Clicked event:', event);
	};

	return <div onClick={onClickHandler}>{event.title}</div>;
};

const CalendarPage = () => {
	// @ts-ignore
	const coursesByDate = useAppSelector(getCoursesByDate);

	const coursesList: EventSchema[] = [];
	coursesByDate &&
		coursesByDate.forEach((course) => {
			coursesList.push({
				start: new Date(course.start_date),
				end: new Date(course.end_date),
				title: course.course_name,
				count: course.count
			});
		});

	const [events, setEvents] = useState<EventSchema[]>(coursesList);
	const [title, setTitle] = useState('');
	const [start, setStart] = useState<Date>();
	const [end, setEnd] = useState<Date>();

	console.log(start, end);

	const onDate = (startDate: Date, endDate: Date) => {
		setStart(startDate);
		setEnd(endDate);
	};
	const onName = (value: string) => {
		setTitle(value);
	};
	const handleSelect = () => {
		const newEvent = { start, end, title };
		setEvents([...events, newEvent]);
	};

	return (
		<Layout>
			<div className={style.wrapper}>
				<Calendar
					components={{ toolbar: Toolbar, event: EventComponent }}
					views={['month']}
					localizer={localizer}
					events={events}
					style={{ border: 'none' }}
					startAccessor='start'
					endAccessor='end'
					selectable
					className={style.calendar}
					eventPropGetter={() => ({
						style: {
							color: '#B07007',
							backgroundColor: '#FCDFB1',
							fontFamily: 'Montserrat, sans-serif'
						}
					})}
				/>
				<NewEventForm onDate={onDate} onName={onName} onFinish={handleSelect} />
			</div>
		</Layout>
	);
};

export default CalendarPage;
