import { type } from 'os';

const json = require('./tree.json');
type DefaultProvince = {
	[key: string]: {
		name: string;
		name_with_type: string;
		code: string;
		'quan-huyen': {
			[key: string]: {
				name: string;
				code: string;
			};
		};
	};
};

type DefaultDistrict = {
	name: string;
	code: number;
};

type DefaultWard = {
	name: string;
	name_with_type: string;
	code: number;
	districts?: Array<DefaultDistrict>;
};

type newProvince = Array<DefaultWard>;

const data: DefaultProvince = json;
const newData: newProvince = [];

for (let i in Object.keys(data)) {
	let key = Object.keys(data)[i];
	let obj: DefaultWard = {
		name: data[key].name,
		name_with_type: data[key].name_with_type,
		code: Number(data[key].code),
		districts: [],
	};
	let district = data[key]['quan-huyen'];
	for (let j in Object.keys(district)) {
		let key2 = Object.keys(district)[j];
		obj.districts.push({
			name: district[key2].name,
			code: Number(district[key2].code),
		});
	}
	newData.push(obj);
}
// sắp xếp theo code
newData.sort((a, b) => {
	if (a.code > b.code) return 1;
	if (a.code < b.code) return -1;
	return 0;
});
export default newData;
