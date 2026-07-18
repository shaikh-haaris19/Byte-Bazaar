// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

    let pinCodes = {
        //"Pincode": ["City", "State"]
        "400001": ["Mumbai", "Maharashtra"],
        "500001": ["Hyderabad", "Telangana"],
        "600001": ["Chennai", "Tamil Nadu"],
        "700001": ["Kolkata", "West Bengal"],
        "800001": ["Patna", "Bihar"],
    };


    res.status(200).json(pinCodes);
}
