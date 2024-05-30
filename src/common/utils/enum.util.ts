export class EnumUtil {
	public static toArray(enumme: any): string[] {
		return Object.keys(enumme).map((key) => enumme[key]);
	}
}
