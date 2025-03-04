export interface Routes {
    Home: undefined;
    Courses: undefined;
    Profile: { userId: number };
    Create: undefined;
    CourseDetails: { courseId: number };
    Assessments: { userId: number };
    Logout: undefined;
    Login: undefined;
    Register: undefined;
    LectionDetails:{lectionId:number}
}
