import { AreaChart, Card, Title } from "@tremor/react";
import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";

const Charts = () => {
  const [info, setInfo] = useState({
    id: 0,
    date: "",
    frontendSalary: null,
    backendSalary: null,
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

  const valueFormatter = function (number) {
    return "$ " + new Intl.NumberFormat("us").format(number).toString();
  };
  return (
    <div>
      <div className="flex ">
        <Card className="basis-2/3 h-[100vh] bg-slate-300">
          <Title>Developer salaries over time (USD)</Title>
          <AreaChart
            className=" mt-1 h-[80vh] "
            data={mockData}
            index="date"
            categories={["frontendSalary", "backendSalary"]}
            colors={["red", "blue"]}
            valueFormatter={valueFormatter}
            onValueChange={(v) => setInfo(v)}
          />
          <pre>{info ? "Seçim Başarılı ✅" : " Seçim Başarısız ❌"}</pre>
        </Card>
        <form
          className="basis-1/3 h-[100vh] bg-slate-300 flex flex-col justify-center "
          onSubmit={handleSubmit}
        >
          <div className="mb-2 mt-6 flex  flex-col justify-center items-center h-full mx-auto w-80">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="feDev">Date:</label>
              <input
                name="date"
                id="date"
                type="text"
                variant="outlined"
                value={info?.date}
                onChange={handleChange}
                required
                className="mb-2 bg-gray-500 text-white placeholder-white placeholder:opacity-50 text-sm rounded-lg block w-full p-2.5 "
                placeholder="Enter Date"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="feDev">Frontend Dev. Salary:</label>
              <input
                name="frontendSalary"
                id="feDev"
                type="text"
                variant="outlined"
                value={info?.frontendSalary}
                onChange={handleChange}
                required
                className="mb-2 bg-gray-500 text-white placeholder-white placeholder:opacity-50 text-sm rounded-lg block w-full p-2.5  "
                placeholder="Enter Frontend Dev. Salary"
              />
            </div>

            <div className="flex flex-col gap-2 mb-5 w-full">
              <label htmlFor="beDev">Backend Dev. Salary:</label>
              <input
                name="backendSalary"
                id="beDev"
                type="text"
                variant="outlined"
                value={info?.backendSalary}
                onChange={handleChange}
                required
                className="mb-2 bg-gray-500 text-white placeholder-white placeholder:opacity-50 text-sm rounded-lg block w-full p-2.5 "
                placeholder="Enter Backend Dev. Salary"
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
        </form>
      </div>
    </div>
  );
};
export default Charts;
