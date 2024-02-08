export interface Courses {
	course_name?: string;
	start_date?: string;
	end_date?: string;
	count?: number;
}

export interface CoursesSchema {
	coursesData: Courses[];
}
