// تعريف واجهة مراجعات الكتب
export interface Review {
    [username: string]: string;
}

// تعريف هيكل بيانات الكتاب
export interface Book {
    isbn: string;
    author: string;
    title: string;
    reviews: Review;
}

// تعريف واجهة المستخدم
export interface User {
    username: string;
    password?: string; // علامة الاستفهام تعني أنه اختياري عند العرض
}

// تعريف استجابة الـ API الموحدة
export interface ApiResponse {
    message: string;
    status: number;
    data?: any;
}
