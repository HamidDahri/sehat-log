"use client";

export type MedicineResultRow = {
  id: string;
  medicine: string;
  dosage: string;
  duration: string;
  notes: string;
};

export type MedicineResultsMode = "view" | "edit";

type Props = {
  title?: string;
  mode: "view" | "edit";
  rows: MedicineResultRow[];
  onChange?: (rows: MedicineResultRow[]) => void;
};

export default function MedicineResultsTable({
  title = "Medicines",
  mode,
  rows,
  onChange,
}: Props) {
  const isEdit = mode === "edit";

  const updateRow = (
    id: string,
    field: keyof MedicineResultRow,
    value: string,
  ) => {
    if (!onChange) return;

    onChange(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const addRow = () => {
    if (!onChange) return;

    onChange([
      ...rows,
      {
        id: crypto.randomUUID(),
        medicine: "",
        dosage: "",
        duration: "",
        notes: "",
      },
    ]);
  };

  return (
    <div className="space-y-3">
      {/* Title */}
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 bg-slate-100 px-4 py-3 text-xs font-medium text-slate-600">
          <span>Medicine</span>
          <span>Dosage</span>
          <span>Duration</span>
          <span>Notes</span>
        </div>

        {/* Rows */}
        <div className="divide-y">
          {rows.map((row) => (
            <div key={row.id} className="grid grid-cols-4 gap-3 px-4 py-2">
              {(["medicine", "dosage", "duration", "notes"] as const).map(
                (field) =>
                  isEdit ? (
                    <input
                      key={field}
                      value={row[field]}
                      onChange={(e) => updateRow(row.id, field, e.target.value)}
                      placeholder={
                        field === "medicine"
                          ? "e.g. Metformin 500mg"
                          : field === "dosage"
                            ? "e.g. 1 tablet, twice daily"
                            : field === "duration"
                              ? "30 days"
                              : "After meals"
                      }
                      className="w-full rounded-lg border border-slate-200 p-2 placeholder:text-gray-400 text-slate-900 text-sm
                                 focus:outline-none focus:ring focus:ring-slate-400"
                    />
                  ) : (
                    <div
                      key={field}
                      className="rounded-lg  bg-white py-2 text-sm text-slate-600"
                    >
                      {row[field] || "—"}
                    </div>
                  ),
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Row (Edit only) */}
      {isEdit && (
        <button
          type="button"
          onClick={addRow}
          className="text-sm font-medium text-green-600 hover:underline"
        >
          + Add Row
        </button>
      )}
    </div>
  );
}
