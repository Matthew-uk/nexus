const LoadingScreen: React.FC = () => (
    <div className="flex justify-center items-center min-h-screen bg-primary">
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-200"></div>
            <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-400"></div>
        </div>
    </div>
);

export default LoadingScreen;