import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const geoPointSchema = new Schema(
    {
        type:{
            type: String,
            default: "Point",
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }

)

const supermarketSchema = new Schema(
    {
        
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            //required: true
        },
        description: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        location: {
            type: geoPointSchema,
           // required: true
        }
        
    },
    {
        timestamps: true
    }
);

export default model('Supermarket', supermarketSchema);