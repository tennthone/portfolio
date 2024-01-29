import { usePage } from "@inertiajs/react";
import React from "react";
import { Button, Datepicker, Label, Select, TextInput} from "flowbite-react";

const AdvancedFilter = ({
    setOpenAdvancedFilter,
    handleAdvancedFilter,
    handleClearFilter,
    handleFilterChange,
    advancedFilter,
}) => {
    const {roles} = usePage().props;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const months = [];
    const years = [];

    // to produce last 10 months
    for (let i = 0; i < 10; i++) {
        years.push(currentYear - i);
    }

    // to produce 12 months
    for (let i = 0; i < 12; i++) {
        const date = new Date();
        date.setMonth(currentMonth - i);
        const monthName = date.toLocaleString("default", { month: "short" });
        months.push({
            name: monthName,
            value: i,
        });
    }
    return (
        <React.Fragment>
            <form onSubmit={handleAdvancedFilter}>
                <div className="absolute top-12 w-2/5 z-50">
                    <div className="bg-slate-100 rounded-md p-3">
                        <p className="font-bold text-xl">Advanced Filter </p>
                        <div className="flex my-3">
                            {/* Name  */}
                            <div className="w-1/2 me-2">
                                <Label> Name </Label>
                                <TextInput
                                    id="name"
                                    placeholder="search name"
                                    value={advancedFilter.name}
                                    onChange={(e) => handleFilterChange(e)}
                                />
                            </div>
                            {/* Email  */}
                            <div className="w-1/2">
                                <Label> Email </Label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={advancedFilter.email}
                                    placeholder="search email"
                                    onChange={(e) => handleFilterChange(e)}
                                />
                            </div>
                        </div>
                        <div className="flex my-3">
                            {/* roles  */}
                            <div className="w-1/2 me-2">
                                <Label> Roles </Label>
                                <Select
                                    id="role"
                                    value={advancedFilter.role}
                                    onChange={(e) => handleFilterChange(e)}
                                >
                                    <option value=""> Select Role </option>
                                    {roles &&
                                        roles.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.name}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                </Select>
                            </div>
                            {/* isactive  */}
                            <div className="w-1/2">
                                <Label> Stauts </Label>
                                <Select
                                    id="status"
                                    value={advancedFilter.status}
                                    onChange={(e) => handleFilterChange(e)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="true"> Active </option>
                                    <option value="false"> Ban </option>
                                </Select>
                            </div>
                        </div>
                        {/* Date  */}
                        <div className="flex my-3">
                            <div className="w-1/2 me-2">
                                <Label> Start Date </Label>
                                <TextInput
                                    type="date"
                                    id="startDate"
                                    onChange={(e) => handleFilterChange(e)}
                                />
                            </div>
                            <div className="w-1/2">
                                <Label> End Date </Label>
                                <TextInput 
                                    type="date"
                                    id="endDate"
                                    onChange={(e) => handleFilterChange(e)}
                                />
                            </div>
                        </div>
                        {/* YY/MM */}
                        <div className="flex my-3">
                            <div className="w-1/2 me-2">
                                <Label> Start YY/MM </Label>
                                <div className="flex justify-between">
                                    <Select
                                        id="startYear"
                                        value={advancedFilter.startYear}
                                        className="w-2/3 me-2"
                                        onChange={(e) => handleFilterChange(e)}
                                    >
                                        <option value="">YY</option>
                                        {years.map((item) => (
                                            <option key={item} className={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </Select>
                                    <Select
                                        id="startMonth"
                                        value={advancedFilter.startMonth}
                                        className="1/3"
                                        onChange={(e) => handleFilterChange(e)}
                                    >
                                        <option value=""> MM </option>
                                        {months.map((item, key) => (
                                            <option
                                                key={key}
                                                value={item.value}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="w-1/2 me-2">
                                <Label> End YY/MM </Label>
                                <div className="flex justify-between">
                                    <Select
                                        id="endYear"
                                        value={advancedFilter.endYear}
                                        className="w-2/3 me-2"
                                        onChange={(e) => handleFilterChange(e)}
                                    >
                                        <option value="">YY</option>
                                        {years.map((item) => (
                                            <option key={item} className={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </Select>
                                    <Select
                                        id="endMonth"
                                        value={advancedFilter.endMonth}
                                        className="1/3"
                                        onChange={(e) => handleFilterChange(e)}
                                    >
                                        <option value=""> MM </option>
                                        {months.map((item, key) => (
                                            <option
                                                key={key}
                                                value={item.value}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end my-3">
                            <Button
                                size="sm"
                                color="failure"
                                type="button"
                                className="me-2"
                                onClick={() => handleClearFilter()}
                            >
                                Clear
                            </Button>
                            <Button
                                size="sm"
                                color="gray"
                                className="me-3"
                                type="button"
                                onClick={() => setOpenAdvancedFilter(false)}
                            >
                                Cancel
                            </Button>
                            <Button size="sm" color="purple" type="submit">
                                Search
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};

export default AdvancedFilter;
