const {  app, getAllEmployees, getEmployeeById, addEmployee } = require("../index");
let http = require("http");

jest.mock("../index.js", ()=> {
    const actualModule = jest.requireActual("../index.js");
    return{
        ...actualModule,
        getAllEmployees: jest.fn(),
        getEmployeeById: jest.fn(),
        addEmployee: jest.fn(),
        };
});

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Function Tests", () => {
 beforeEach(() => {
  jest.clearAllMocks();
 });
 
 test("getAllEmployees should return a list of employess", () => {
  const mockEmployees = [
    { id: 1, name: 'John Doe', position: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', position: 'Product Manager' },
    { id: 3, name: 'Sam Johnson', position: 'Designer' }
  ]
   
  getAllEmployees.mockReturnValue(mockEmployees);

  let result = getAllEmployees();
  expect(result).toEqual(mockEmployees); 
  expect(getAllEmployees).toHaveBeenCalled();
 });

 test("getEmployeeById should return employee details", () => {
    const mockEmployee = { id: 1, name: 'John Doe', position: 'Software Engineer' };
    
    getEmployeeById.mockReturnValue(mockEmployee);

    let result = getEmployeeById(1);
    expect(result).toEqual(mockEmployee);
    expect(getEmployeeById).toHaveBeenCalledWith(1);
 });

 test("getEmployeeById should return undefined if employee not found", () => {
    getEmployeeById.mockReturnValue(undefined);

    let result = getEmployeeById(999);
    expect(result).toBe(undefined);
    expect(getEmployeeById).toHaveBeenCalledWith(999);
 });

 test("addEmployee should return a new employee", () => {
    const newEmployee = { employeeId: 4, name: "Sam Altman", position: "AI engineer" }; 

    addEmployee.mockReturnValue(newEmployee);

    let result = addEmployee(newEmployee);
    expect(result).toEqual(newEmployee);
    expect(addEmployee).toHaveBeenCalledWith(newEmployee);
 });   
});