import ReportCategory from "../models/reportCategory.model.js";

export const getReportCategorys = async(req, res)=>{
    try {
        const response = await ReportCategory.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createReportCategorys = async(req, res)=>{
    try {
        await ReportCategory.create(req.body);
        res.status(201).json({msg: "ReportCategory add"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteReportCategory = async(req, res)=>{
    try {
        await ReportCategory.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "ReportCategory berhasil di hapus"})
    } catch (error) {
        console.log(error.message);
    }
}