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
  //   const [info, setInfo] = useState({
  //     date: "",
  //     frontendSalary: null,
  //     backendSalary: null,
  //   });

  const { mockData, delData, postData, putData } = useContext(DataContext);
  console.log(mockData);
  //   const handleChange = (e) => {
  //     e.preventDefault();
  //     const { name, value } = e.target;
  //     setInfo({ ...info, [name]: value });
  //   };
  //   const newID = mockData?.map((item) => item?.id);
  //   console.log(newID);
  //   const valueID = mockData?.filter((item) => newID?.includes(item.id));
  //   console.log(valueID);

  //   const filteredID = depertman?.filter((item) => like.includes(item.id));

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (info.id) {
  //       putData(info);
  //     } else {
  //       postData(info);
  //     }
  //     setInfo({});
  //   };

  //   const handleDelete = () => {
  //     delData(info);
  //     setInfo({});
  //   };

  return (
    <Formik
      initialValues={{
        id: 0,
        date: "",
        frontendSalary: 0,
        backendSalary: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        // e.preventDefault();
        if (values?.id) {
          putData(values);
        } else {
          postData(values);
        }

        actions.resetForm();
        actions.setSubmitting(false);
      }}
    >
      {(formikProps) => (
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
                onValueChange={(v) => {
                  formikProps.setFieldValue("date", v.date); // Veriyi Formik ile uyumlu hale getirin
                  formikProps.setFieldValue("frontendSalary", v.frontendSalary); // Veriyi Formik ile uyumlu hale getirin
                  formikProps.setFieldValue("backendSalary", v.backendSalary);
                }}
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
                onValueChange={(v) => {
                  formikProps.setFieldValue("id", v.id);
                  console.log(v.id);
                  formikProps.setFieldValue("date", v.date); // Veriyi Formik ile uyumlu hale getirin
                  formikProps.setFieldValue("backendSalary", v.backendSalary); // Veriyi Formik ile uyumlu hale getirin
                  formikProps.setFieldValue("frontendSalary", v.frontendSalary);
                }}
              />
            </Card>
          </Grid>
          <Grid item gridColumn="span 4">
            <Form
              className="basis-1/3 h-[395px] rounded-lg bg-[#111827] flex flex-col justify-center "
              onSubmit={formikProps.handleSubmit}
            >
              <div className="mb-2 mt-6 flex  flex-col justify-center items-center h-full mx-auto w-80">
                <div className="flex flex-col gap-2 w-full text-white">
                  <label htmlFor="date">Date:</label>

                  <Field
                    name="date"
                    id="fed"
                    type="month"
                    variant="outlined"
                    // value={info?.date}
                    // onChange={handleChange}
                    value={formikProps.values.date}
                    onChange={formikProps.handleChange}
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
                    // value={info?.frontendSalary}
                    // onChange={handleChange}
                    value={formikProps.values.frontendSalary}
                    onChange={formikProps.handleChange}
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
                    // value={info?.backendSalary}
                    // onChange={handleChange}
                    value={formikProps.values.backendSalary}
                    onChange={formikProps.handleChange}
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
                    onClick={formikProps.resetForm}
                    type="reset"
                    className="bg-black rounded-xl my-2 py-1 px-4 w-full text-white"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => delData(formikProps.values)}
                    type="submit"
                    className="bg-red-700 rounded-xl my-2 py-1 px-4 w-full text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Form>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default Try;
