import React, { useContext, useState } from "react";
import { Card, Title, LineChart } from "@tremor/react";
import { Grid } from "@mui/material";
import { DataContext } from "../context/DataContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  date: Yup.string().required("Ay seçmelisiniz"),
  frontendSalary: Yup.number()
    .typeError("Lütfen bir numara girin")
    .required("Numara alanı gereklidir"),
  backendSalary: Yup.number()
    .typeError("Lütfen bir numara girin")
    .required("Numara alanı gereklidir"),
});

const dataFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;
const Try = () => {
  const [info, setInfo] = useState({
    date: "",
    frontendSalary: 0,
    backendSalary: 0,
  });

  const { mockData, delData, postData, putData } = useContext(DataContext);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.id) {
      putData(info);
    } else {
      postData(info);
    }
  };

  const handleDelete = () => {
    delData(info);
    setInfo({});
  };

  return (
    <Formik
      initialValues={{ date: "", frontendSalary: 0, backendSalary: 0 }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        actions.resetForm();
        actions.setSubmitting(false);
      }}
    >
      <Grid
        container
        justifyContent="center"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
      >
        <Grid item gridColumn="span 4" height={"700px"}>
          <Card>
            <Title>Frontend Salaries</Title>
            <LineChart
              data={mockData}
              index="date"
              categories={["frontendSalary"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              onValueChange={(v) => setInfo(v)}
            />
          </Card>
        </Grid>
        <Grid item gridColumn="span 4">
          <Card sx={{ p: 2 }}>
            <Title>Backend Salaries</Title>
            <LineChart
              index="date"
              data={mockData}
              categories={["backendSalary"]}
              colors={["red"]}
              valueFormatter={dataFormatter}
              onValueChange={(v) => setInfo(v)}
            />
          </Card>
        </Grid>
        <Grid item gridColumn="span 4">
          <Form
            className="basis-1/3 h-[395px] rounded-lg bg-[#111827] flex flex-col justify-center "
            onSubmit={handleSubmit}
          >
            <div className="mb-2 mt-6 flex  flex-col justify-center items-center h-full mx-auto w-80">
              <div className="flex flex-col gap-2 w-full text-white">
                <label htmlFor="date">Date:</label>

                <Field
                  name="date"
                  id="fed"
                  type="month"
                  variant="outlined"
                  value={info?.date}
                  onChange={handleChange}
                  required
                  className="mb-2 bg-gray-500 text-white placeholder-white placeholder:opacity-50 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Enter Date"
                />
                <ErrorMessage
                  className=" text-red-700 mb-2 invalid-feedback"
                  name="date"
                  component="div"
                />
              </div>
              <div className="flex flex-col gap-2 w-full text-white">
                <label htmlFor="frontendSalary">Frontend Dev. Salary:</label>
                <Field
                  name="frontendSalary"
                  id="frontendSalary"
                  type="number"
                  variant="outlined"
                  value={info?.frontendSalary}
                  onChange={handleChange}
                  required
                  className="mb-2 bg-gray-500 text-white placeholder-white placeholder:opacity-50 text-sm rounded-lg block w-full p-2.5  "
                  placeholder="Enter Frontend Dev. Salary"
                />
                <ErrorMessage
                  className=" text-red-700 mb-2 invalid-feedback"
                  name="frontendSalary"
                  component="div"
                />
              </div>

              <div className="flex flex-col gap-2 mb-5 w-full text-white">
                <label htmlFor="backendSalary">Backend Dev. Salary:</label>
                <Field
                  name="backendSalary"
                  id="backendSalary"
                  type="number"
                  variant="outlined"
                  value={info?.backendSalary}
                  onChange={handleChange}
                  required
                  className="mb-2 bg-gray-500 text-white placeholder-white placeholder:opacity-50 text-sm rounded-lg block w-full p-2.5 "
                  placeholder="Enter Backend Dev. Salary"
                />
                <ErrorMessage
                  className=" text-red-700 mb-2"
                  name="backendSalary"
                  component="div"
                />
              </div>
              <div className=" w-full flex flex-row justify-around gap-3">
                <button
                  type="submit"
                  className="bg-green-700 rounded-xl my-2 py-1 px-4 w-full text-white "
                >
                  Submit
                </button>
                <button
                  onClick={() => setInfo({})}
                  type="reset"
                  className="bg-black rounded-xl my-2 py-1 px-4 w-full text-white"
                >
                  Reset
                </button>
                <button
                  onClick={handleDelete}
                  type="reset"
                  className="bg-red-700 rounded-xl my-2 py-1 px-4 w-full text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </Form>
        </Grid>
      </Grid>
    </Formik>
  );
};

export default Try;
