exports.HTTP_200_OK = (req, res) => {
	res.status(200).json({
		status: "success",
		results: req.data.length,
		data: req.data,
	});
};

exports.HTTP_201_CREATED = (req, res) => {
	res.status(201).json({
		status: "success",
		data: req.data,
	});
};

exports.HTTP_204_NO_CONTENT = (req, res) => {
	res.status(204).json({
		status: "success",
		data: null,
	});
};
