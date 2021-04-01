const User = require("../models/user");
const jwt = require("jsonwebtoken");
const handleError = (err) => {
	console.log(err.message, err.code);
	let errors = { email: "", password: "" };

	if (err.message === "incorrect email") {
		errors.email = "that email is not registered";
		return errors;
	}

	if (err.message === "incorrect password") {
		errors.password = "that password is not registered";
		return errors;
	}

	if (err.code === 11000) {
		errors.email = "This email already exists";
		return errors;
	}

	if (err.message.includes("")) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	return errors;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, "ninja secret", {
		expiresIn: maxAge,
	});
};


module.exports.signup_post = async (req, res) => {
	const { name, email, password, role ,category} = req.body;
	try {
		const user = await User.create({ name, email, password, role, category });
		const token = createToken(user._id);
		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(201).send({ user: user._id, message: "created" });
	} catch (err) {
		const errors = handleError(err);
		res.status(400).json(errors);
	}
};
module.exports.login_post = async (req, res) => {

	const { email, password } = req.body;


	try {
		const user = await User.login(email, password);
		const token = createToken(user._id);
		if (user.status === "disabled") {
			res.status(400).send("You are not allowed")
		}
		else {
			res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
			res.status(200).send({ token, message: "logged" });
			// res.send("logged")
		}

	} catch (err) {
		const errors = handleError(err);
		res.status(400).json({ errors });
	}
};
module.exports.admin_get = (req, res) => {
	res.send("welcome to admin");
};
module.exports.all = (req, res) => {
	User.find()
		.populate('category')
		.then((result) => res.send(result))
		.catch((err) => console.log("err"));
};
module.exports.user_get = async (req, res) => {
	//   console.log("req",req.user)
	const userShow = await User.findOne({ _id: req.user.id });
	console.log("this is user", userShow);
	res.send(userShow);
};

module.exports.id = (req, res) => {
	User.findById(req.params.id)
		.then((result) => res.send(result))
		.catch((err) => console.log(err));
};

module.exports.del = (req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then((result) => res.send(result))
		.catch((err) => console.log(err));
};

module.exports.edit_post = async (req, res) => {
	User.updateOne(
		{ _id: req.params.id },
		{ $set: { name: req.body.name, email: req.body.email, status: req.body.status, category: req.body.category } }
	).then((result) => res.send(result))
		.catch((err) => { res.status(400).send("email already exists") })
};
