# RN_EmployeeManagementApp
Employee Management App
Giới Thiệu
Dự án "Employee Management" là một ứng dụng di động được xây dựng bằng React Native, sử dụng Node.js (Express) làm back-end và MongoDB làm cơ sở dữ liệu. Ứng dụng cung cấp các chức năng quản lý nhân viên, bao gồm đăng ký, đăng nhập, đăng xuất, quản lý thông tin nhân viên, chấm công, và báo cáo tóm tắt chấm công.

Cài Đặt
Phần Front-end (React Native)
Clone repository:

bash
Copy code
git clone https://github.com/your-username/employee-management-app.git
Di chuyển vào thư mục dự án:

bash
Copy code
cd employee-management-app
Cài đặt các dependencies:

bash
Copy code
npm install
Chạy ứng dụng:

bash
Copy code
npm start
Phần Back-end (Node.js và MongoDB)
Di chuyển vào thư mục back-end:

bash
Copy code
cd api
Cài đặt các dependencies:

bash
Copy code
npm install
Tạo một file .env trong thư mục backend với nội dung sau (thay đổi các giá trị theo thông tin cấu hình của bạn):

bash
Copy code
npm start
Chức Năng
Đăng Ký và Đăng Nhập
Người dùng có thể đăng ký tài khoản mới với email và mật khẩu.
Người dùng có thể đăng nhập với tài khoản đã đăng ký.
Đăng Xuất
Người dùng có thể đăng xuất khỏi tài khoản hiện tại.
Quản Lý Nhân Viên (CRUD)
Thêm mới nhân viên với các thông tin như tên, địa chỉ, ngày sinh, v.v.
Xem danh sách tất cả nhân viên.
Cập nhật thông tin nhân viên.
Xóa nhân viên khỏi hệ thống.
Chấm Công Nhân Viên
Ghi nhận và cập nhật chấm công cho từng nhân viên.
Báo Cáo Tóm Tắt Chấm Công
Xem báo cáo tóm tắt chấm công của mỗi nhân viên.
Navigation với Expo Router
Sử dụng Expo Router để quản lý định tuyến giữa các màn hình trong ứng dụng.
