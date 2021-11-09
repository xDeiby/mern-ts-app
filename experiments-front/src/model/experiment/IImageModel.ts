export interface IImageModel extends Document {
    readonly id: string;
    title: string;
    description: string;
    pathImage: string;
    modelJson: string;
    quiz: string;
    experiment: string;
    cloudinaryId: string;
}
