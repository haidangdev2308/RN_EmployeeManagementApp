const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8000; //chọn port để kết nối database
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

mongoose
    .connect("mongodb+srv://haidang23082002:upvUw4qXlYIqzyCx@cluster0.5gkpfki.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });

app.listen(port, () => {
    console.log("Server is running on port 8000");
});

const Employee = require("./models/employee");
const Attendance = require("./models/attendance");
const User = require("./models/user")

//endpoint to register a employee
app.post("/addEmployee", async (req, res) => {
    try {
        const {
            employeeName,
            employeeId,
            designation,
            phoneNumber,
            dateOfBirth,
            joiningDate,
            activeEmployee,
            salary,
            address,
        } = req.body;

        //create a new Employee
        const newEmployee = new Employee({
            employeeName,
            employeeId,
            designation,
            phoneNumber,
            dateOfBirth,
            joiningDate,
            activeEmployee,
            salary,
            address,
        });

        await newEmployee.save();

        res
            .status(201)
            .json({ message: "Employee saved successfully", employee: newEmployee });
    } catch (error) {
        console.log("Error creating employee", error);
        res.status(500).json({ message: "Failed to add an employee" });
    }
});

//đọc dữ liệu
app.get("/employees", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve the employees" });
    }
});

// Endpoint để xoá một nhân viên dựa trên ID
app.delete("/deleteEmployee/:id", async (req, res) => {
    try {
        const employeeId = req.params.id;

        // Kiểm tra xem nhân viên có tồn tại hay không
        const existingEmployee = await Employee.findOne({ employeeId });
        if (!existingEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Xoá nhân viên
        await existingEmployee.deleteOne();

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.log("Error deleting employee", error);
        res.status(500).json({ message: "Failed to delete the employee" });
    }
});

// Endpoint để cập nhật thông tin nhân viên dựa trên ID
app.put("/updateEmployee/:id", async (req, res) => {
    try {
        const employeeId = req.params.id;

        // Kiểm tra xem nhân viên có tồn tại hay không
        const existingEmployee = await Employee.findOne({ employeeId });
        if (!existingEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Cập nhật thông tin nhân viên
        const {
            employeeName,
            designation,
            phoneNumber,
            dateOfBirth,
            joiningDate,
            activeEmployee,
            salary,
            address,
        } = req.body;

        existingEmployee.employeeName = employeeName || existingEmployee.employeeName;
        existingEmployee.designation = designation || existingEmployee.designation;
        existingEmployee.phoneNumber = phoneNumber || existingEmployee.phoneNumber;
        existingEmployee.dateOfBirth = dateOfBirth || existingEmployee.dateOfBirth;
        existingEmployee.joiningDate = joiningDate || existingEmployee.joiningDate;
        existingEmployee.salary = salary || existingEmployee.salary;
        existingEmployee.address = address || existingEmployee.address;

        await existingEmployee.save(); //.updateOne

        res.status(200).json({ message: "Employee updated successfully", employee: existingEmployee });
    } catch (error) {
        console.log("Error updating employee", error);
        res.status(500).json({ message: "Failed to update the employee" });
    }
});

// thực hiện việc tạo mới hoặc cập nhật thông tin chấm công của nhân viên trong cơ sở dữ liệu MongoDB dựa trên yêu cầu POST từ client
app.post("/attendance", async (req, res) => {
    try {
        const { employeeId, employeeName, date, status } = req.body;

        const existingAttendance = await Attendance.findOne({ employeeId, date });

        if (existingAttendance) {
            existingAttendance.status = status;
            await existingAttendance.save();
            res.status(200).json(existingAttendance);
        } else {
            const newAttendance = new Attendance({
                employeeId,
                employeeName,
                date,
                status,
            });
            await newAttendance.save();
            res.status(200).json(newAttendance);
        }
    } catch (error) {
        res.status(500).json({ message: "Error submitting attendance" });
    }
});

// Endpoint này được đặt tại đường dẫn "/attendance" và xử lý yêu cầu GET để truy vấn dữ liệu (attendance) dựa trên ngày cụ thể.
app.get("/attendance", async (req, res) => {
    try {
        const { date } = req.query;//Sử dụng destructuring để trích xuất giá trị của tham số "date" từ đối tượng req.query. 

        // Find attendance records for the specified date
        const attendanceData = await Attendance.find({ date: date });

        res.status(200).json(attendanceData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching attendance data" });
    }
});

app.get("/attendance-report-all-employees", async (req, res) => {
    try {
        const { month, year } = req.query;

        console.log("Query parameters:", month, year);
        // Calculate the start and end dates for the selected month and year
        const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
            .startOf("month")
            .toDate();
        const endDate = moment(startDate).endOf("month").toDate();

        // Aggregate attendance data for all employees and date range
        const report = await Attendance.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            {
                                $eq: [
                                    { $month: { $dateFromString: { dateString: "$date" } } },
                                    parseInt(req.query.month),
                                ],
                            },
                            {
                                $eq: [
                                    { $year: { $dateFromString: { dateString: "$date" } } },
                                    parseInt(req.query.year),
                                ],
                            },
                        ],
                    },
                },
            },

            {
                $group: {
                    _id: "$employeeId",
                    present: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
                        },
                    },
                    absent: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
                        },
                    },
                    halfday: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
                        },
                    },
                    holiday: {
                        $sum: {
                            $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "employees", // Name of the employee collection
                    localField: "_id",
                    foreignField: "employeeId",
                    as: "employeeDetails",
                },
            },
            {
                $unwind: "$employeeDetails", // Unwind the employeeDetails array
            },
            {
                $project: {
                    _id: 1,
                    present: 1,
                    absent: 1,
                    halfday: 1,
                    name: "$employeeDetails.employeeName",
                    designation: "$employeeDetails.designation",
                    salary: "$employeeDetails.salary",
                    employeeId: "$employeeDetails.employeeId",
                },
            },
        ]);

        res.status(200).json({ report });
    } catch (error) {
        console.error("Error generating attendance report:", error);
        res.status(500).json({ message: "Error generating the report" });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra xem tài khoản đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(500).json({ message: 'Email already exists' });
        }

        // Hash mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = new User({ email: email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra xem tài khoản có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Tạo token
        const token = jwt.sign({ username: user.email }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token }); // gửi res với token được cấp cho front-end
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});