import User from '../models/user.js';

export const createUser = async (req, res) => {
    try {
        const { email, password, name, role, country } = req.body;
        // const profilePhoto = req.file ? req.file.path : '';
        const profilePhoto = "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"

        const newUser = new User({
            email,
            password,
            name,
            role,
            country,
            profilePhoto
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
};
