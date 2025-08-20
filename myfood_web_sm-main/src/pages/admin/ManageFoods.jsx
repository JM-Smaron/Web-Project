import { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2, X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- NEW: State for the update modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFood, setEditingFood] = useState(null);

    // Function to fetch all foods
    const fetchFoods = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://assignment-11-flame.vercel.app/allFoods');
            setFoods(response.data);
        } catch (error) {
            toast.error("Failed to fetch food items.");
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    // --- UPDATED: Delete functionality ---
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await axios.delete(`https://assignment-11-flame.vercel.app/allFoods/${id}`);
                setFoods(foods.filter(food => food._id !== id));
                toast.success("Food item deleted successfully!");
            } catch (error) {
                toast.error("Failed to delete food item.");
                console.error("Delete error:", error);
            }
        }
    };

    // --- NEW: Functions to handle the update modal ---
    const handleEditClick = (food) => {
        setEditingFood(food);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingFood(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingFood({ ...editingFood, [name]: value });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`https://assignment-11-flame.vercel.app/allFoods/update/${editingFood._id}`, editingFood);
            toast.success("Food item updated successfully!");
            handleModalClose();
            fetchFoods(); // Re-fetch all foods to see the update
        } catch (error) {
            toast.error("Failed to update food item.");
            console.error("Update error:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Manage Food Items</h1>
                <p className="text-gray-500 dark:text-gray-400">View, edit, or delete items from your menu.</p>
            </div>

            <div className="overflow-x-auto bg-white dark:bg-[#121212] rounded-lg shadow">
                <table className="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold">Image</th>
                            <th className="px-6 py-3 text-left font-semibold">Food Name</th>
                            <th className="px-6 py-3 text-left font-semibold">Price</th>
                            <th className="px-6 py-3 text-left font-semibold">Quantity</th>
                            <th className="px-6 py-3 text-left font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {foods.map((food) => (
                            <tr key={food._id}>
                                <td className="px-6 py-4">
                                    <img src={food.Image} alt={food.FoodName} className="w-12 h-12 object-cover rounded-md" />
                                </td>
                                <td className="px-6 py-4 font-medium">{food.FoodName}</td>
                                <td className="px-6 py-4">${parseFloat(food.Price).toFixed(2)}</td>
                                <td className="px-6 py-4">{food.Quantity}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => handleEditClick(food)} className="text-blue-500 hover:text-blue-700">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(food._id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- NEW: Update Food Modal --- */}
            {isModalOpen && editingFood && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-lg relative">
                        <h2 className="text-2xl font-bold mb-4">Edit Food Item</h2>
                        <button onClick={handleModalClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                            <X size={24} />
                        </button>
                        <form onSubmit={handleUpdateSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Food Name</label>
                                <input type="text" name="FoodName" value={editingFood.FoodName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Image URL</label>
                                <input type="text" name="Image" value={editingFood.Image} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Price</label>
                                    <input type="number" name="Price" value={editingFood.Price} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Quantity</label>
                                    <input type="number" name="Quantity" value={editingFood.Quantity} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Category</label>
                                <input type="text" name="foodCategory" value={editingFood.foodCategory} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Description</label>
                                <textarea name="Description" value={editingFood.Description} onChange={handleInputChange} rows="3" className="mt-1 block w-full px-3 py-2 border rounded-md"></textarea>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button type="button" onClick={handleModalClose} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageFoods;