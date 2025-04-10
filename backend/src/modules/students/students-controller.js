const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const { name, className, section, roll } = req.query;
    const payload = { name, className, section, roll };
    
    try {
        const students = await getAllStudents(payload);
        res.status(200).json({
            success: true,
            data: students
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const studentData = req.body;
    
    try {
        const result = await addNewStudent(studentData);
        res.status(201).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const studentData = { ...req.body, id: studentId };
    
    try {
        const result = await updateStudent(studentData);
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    
    try {
        const studentDetail = await getStudentDetail(studentId);
        res.status(200).json({
            success: true,
            data: studentDetail
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const { status } = req.body;
    const reviewerId = req.user.id; // Assuming user ID is available in req.user
    
    try {
        const result = await setStudentStatus({
            userId: studentId,
            reviewerId,
            status
        });
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
