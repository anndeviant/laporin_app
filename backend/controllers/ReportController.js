import Report from "../models/report.model.js";

export const getReports = async(req, res)=>{
    try {
        const response = await Report.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getReportsById = async(req, res) => {
    try {
        const response = await Report.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
}

export const createReports = async(req, res)=>{
    try {
        await Report.create(req.body);
        res.status(201).json({msg: "Report add"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateReport = async(req, res)=>{
    try {
        await Report.update(req.body,{
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Report berhasil di update"})
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteReport = async(req, res)=>{
    try {
        await Report.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Report berhasil di hapus"})
    } catch (error) {
        console.log(error.message);
    }
}