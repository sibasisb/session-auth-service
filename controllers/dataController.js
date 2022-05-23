const dataController = (req, res, next) => {
    res.status(200).json({message: "personal info"});
};

module.exports = {dataController};
