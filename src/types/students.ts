export interface StudentsProps {
    fetchStudents: (page: any) => Promise<any>;
    fetchRoutes: () => Promise<any>;
    deleteStudents: (studentId: string) => Promise<any>;
    students: Array<any>;
    totalPages: number;
    selectedPage: number;
    total: number;
    routes: Array<any>;
};