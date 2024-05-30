export class FileUtil {
	public static getContent(filePath: string): string {
		return require('fs').readFileSync(filePath, 'utf8');
	}
}
