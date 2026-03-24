import { Form, Input, InputNumber, Select } from "antd";

export const CategoryFields = {
  Auto: () => (
    <>
      <Form.Item
        label="Бренд"
        name={["params", "brand"]}
        rules={[{ required: true }]}
      >
        <Input placeholder="Например, Mitsubishi" />
      </Form.Item>
      <Form.Item
        label="Модель"
        name={["params", "model"]}
        rules={[{ required: true }]}
      >
        <Input placeholder="Например, Lancer" />
      </Form.Item>
      <Form.Item
        label="Год выпуска"
        name={["params", "yearOfManufacture"]}
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "100%" }} placeholder="2021" />
      </Form.Item>
      <Form.Item
        label="Коробка передач"
        name={["params", "transmission"]}
        rules={[{ required: true }]}
      >
        <Select placeholder="Выберите тип">
          <Select.Option value="automatic">Автомат</Select.Option>
          <Select.Option value="manual">Механика</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Пробег (км)"
        name={["params", "mileage"]}
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "100%" }} placeholder="50000" />
      </Form.Item>
      <Form.Item
        label="Мощность двигателя"
        name={["params", "enginePower"]}
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "100%" }} placeholder="100 л.с." />
      </Form.Item>
    </>
  ),
  Electronics: () => (
    <>
      <Form.Item
        label="Тип"
        name={["params", "type"]}
        rules={[{ required: true }]}
      >
        <Select placeholder="Выберите тип">
          <Select.Option value="phone">Телефон</Select.Option>
          <Select.Option value="laptop">Ноутбук</Select.Option>
          <Select.Option value="misc">Другое</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Бренд"
        name={["params", "brand"]}
        rules={[{ required: true }]}
      >
        <Input placeholder="Например, Apple" />
      </Form.Item>
      <Form.Item
        label="Модель"
        name={["params", "model"]}
        rules={[{ required: true }]}
      >
        <Input placeholder="Например, M1 Pro" />
      </Form.Item>
      <Form.Item
        label="Состояние"
        name={["params", "condition"]}
        rules={[{ required: true }]}
      >
        <Select placeholder="Выберите состояние">
          <Select.Option value="new">Новое</Select.Option>
          <Select.Option value="used">Б/У</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Цвет"
        name={["params", "color"]}
        rules={[{ required: true }]}
      >
        <Input placeholder="Например, Space Gray" />
      </Form.Item>
    </>
  ),
  RealEstateFields: () => (
    <>
      <Form.Item
        label="Тип недвижимости"
        name={["params", "type"]}
        rules={[{ required: true }]}
      >
        <Select placeholder="Выберите тип">
          <Select.Option value="flat">Квартира</Select.Option>
          <Select.Option value="house">Дом</Select.Option>
          <Select.Option value="room">Комната</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Адрес"
        name={["params", "address"]}
        rules={[{ required: true }]}
      >
        <Input placeholder="Город, улица, дом" />
      </Form.Item>
      <Form.Item
        label="Площадь (м²)"
        name={["params", "area"]}
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "100%" }} placeholder="55" />
      </Form.Item>
      <Form.Item
        label="Этаж"
        name={["params", "floor"]}
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "100%" }} placeholder="5" />
      </Form.Item>
    </>
  ),
};
