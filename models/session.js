var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var sessionSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        sections: {

            content: [{
                description: String, pages: {
                    type: Number,
                    default: 1
                }
            }]
            ,
            quetions: [
                {
                    title: {
                        type: String,
                        required: true,
                        unique: true
                    },

                    options: [
                        {
                            title: {
                                type: String,
                                unique: true
                            }, isCorrect: Boolean
                        },
                    ]
                    ,

                    pages: {
                        type: Number,
                        default: 1
                    }
                }
            ]

        }

    },
    { timestamps: true }
)
module.exports = mongoose.model("Session", sessionSchema);
