import { Form, Input, InputNumber, Select } from "antd";
import { Option } from "antd/es/mentions";

export const CategoryFieldsAuto = () => {
  const params = Form.useWatch(["params"], Form.useFormInstance());

  return (
    <>
      <Form.Item
        label="Бренд"
        name={["params", "brand"]}
        rules={[{ required: false }]}
        validateStatus={!params?.brand ? "warning" : ""}
      >
        <Input placeholder="Например, Mitsubishi" allowClear />
      </Form.Item>
      <Form.Item
        label="Модель"
        name={["params", "model"]}
        rules={[{ required: false }]}
        validateStatus={!params?.model ? "warning" : ""}
      >
        <Input placeholder="Например, Lancer" allowClear />
      </Form.Item>
      <Form.Item
        label="Год выпуска"
        name={["params", "yearOfManufacture"]}
        rules={[{ required: false }]}
        validateStatus={!params?.yearOfManufacture ? "warning" : ""}
      >
        <InputNumber style={{ width: "100%" }} placeholder="2021" />
      </Form.Item>
      <Form.Item
        label="Коробка передач"
        name={["params", "transmission"]}
        rules={[{ required: false }]}
        validateStatus={!params?.transmission ? "warning" : ""}
      >
        <Select placeholder="Выберите тип">
          <Option value="automatic">Автомат</Option>
          <Option value="manual">Механика</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Пробег (км)"
        name={["params", "mileage"]}
        rules={[{ required: false }]}
        validateStatus={!params?.mileage ? "warning" : ""}
      >
        <InputNumber style={{ width: "100%" }} placeholder="50000" />
      </Form.Item>
      <Form.Item
        label="Мощность двигателя"
        name={["params", "enginePower"]}
        rules={[{ required: false }]}
        validateStatus={!params?.enginePower ? "warning" : ""}
      >
        <InputNumber style={{ width: "100%" }} placeholder="100 л.с." />
      </Form.Item>
    </>
  );
};

export const CategoryFieldsElectronics = () => {
  const params = Form.useWatch(["params"], Form.useFormInstance());
  return (
    <>
      <Form.Item
        label="Тип"
        name={["params", "type"]}
        rules={[{ required: false }]}
        validateStatus={!params?.type ? "warning" : ""}
      >
        <Select placeholder="Выберите тип">
          <Option value="phone">Телефон</Option>
          <Option value="laptop">Ноутбук</Option>
          <Option value="misc">Другое</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Бренд"
        name={["params", "brand"]}
        rules={[{ required: false }]}
        validateStatus={!params?.brand ? "warning" : ""}
      >
        <Input placeholder="Например, Apple" allowClear />
      </Form.Item>
      <Form.Item
        label="Модель"
        name={["params", "model"]}
        rules={[{ required: false }]}
        validateStatus={!params?.model ? "warning" : ""}
      >
        <Input placeholder="Например, M1 Pro" allowClear />
      </Form.Item>
      <Form.Item
        label="Состояние"
        name={["params", "condition"]}
        rules={[{ required: false }]}
        validateStatus={!params?.condition ? "warning" : ""}
      >
        <Select placeholder="Выберите состояние">
          <Option value="new">Новое</Option>
          <Option value="used">Б/У</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Цвет"
        name={["params", "color"]}
        rules={[{ required: false }]}
        validateStatus={!params?.color ? "warning" : ""}
      >
        <Input placeholder="Например, Space Gray" allowClear />
      </Form.Item>
    </>
  );
};

export const CategoryFieldsRealEstate = () => {
  const params = Form.useWatch(["params"], Form.useFormInstance());
  return (
    <>
      <Form.Item
        label="Тип недвижимости"
        name={["params", "type"]}
        rules={[{ required: false }]}
        validateStatus={!params?.type ? "warning" : ""}
      >
        <Select placeholder="Выберите тип">
          <Option value="flat">Квартира</Option>
          <Option value="house">Дом</Option>
          <Option value="room">Комната</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Адрес"
        name={["params", "address"]}
        rules={[{ required: false }]}
        validateStatus={!params?.address ? "warning" : ""}
      >
        <Input placeholder="Город, улица, дом" allowClear />
      </Form.Item>
      <Form.Item
        label="Площадь (м²)"
        name={["params", "area"]}
        rules={[{ required: false }]}
        validateStatus={!params?.area ? "warning" : ""}
      >
        <InputNumber style={{ width: "100%" }} placeholder="55" />
      </Form.Item>
      <Form.Item
        label="Этаж"
        name={["params", "floor"]}
        rules={[{ required: false }]}
        validateStatus={!params?.floor ? "warning" : ""}
      >
        <InputNumber style={{ width: "100%" }} placeholder="5" />
      </Form.Item>
    </>
  );
};
