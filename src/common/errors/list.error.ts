import { ApiException } from './api.error';
import { Errors } from '../decorators/listError.decorator';

function fn(message: string, status: number) {
	return new ApiException(message, status);
}

@Errors
export class ListErrors {
	public static readonly USER_NOT_FOUND = fn('User not found', 404);
	public static readonly CATEGORY_NOT_FOUND = fn('Category not found', 404);
	public static readonly PRODUCT_NOT_FOUND = fn('Product not found', 404);
	public static readonly ORDER_NOT_FOUND = fn('Order not found', 404);
}
