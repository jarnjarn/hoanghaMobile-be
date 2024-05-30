

export class ImgurModel {
	public link: string;

	constructor(entity: any) {
		this.link = entity.data.link;
	}

	public static formEntity(entity: any): ImgurModel {
		return new ImgurModel(entity);
	}
}