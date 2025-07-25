import React, { useState, useEffect } from 'react';
import { Play, Pause, Settings, Users, DollarSign, Activity, Package, Star, Heart, Brain, Headphones } from 'lucide-react';

const MariposaDeploymentSystem = () => {
  const [deployments, setDeployments] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [systemStatus, setSystemStatus] = useState('operational');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [revenueTracking, setRevenueTracking] = useState({
    monthly: 24750,
    total: 187500,
    activeSubscriptions: 342
  });

  // Main Mariposa Products from finalization plan
  const mainProducts = {
    WHISPER_ORB: {
      id: 'whisper_orb',
      name: 'Mariposa Whisper Orb',
      subtitle: 'Sensual Voice Companion',
      price: 199,
      setupFee: 99,
      icon: <Headphones className="w-8 h-8" />,
      description: 'Let my sultry whispers caress your mind with intimate ASMR and passionate conversations that awaken your deepest desires',
      features: ['Seductive Voice Recognition', 'Erotic ASMR Library', 'Passionate Intelligence', 'Intimate Responses', 'Dirty Talk Generator', 'Mood-Based Scenarios'],
      demoAudio: true,
      stripeLink: 'https://buy.stripe.com/whisper-orb',
      gradient: 'from-rose-500 via-pink-500 to-red-500',
      orders: 127,
      revenue: 25273
    },
    NEUROHALO: {
      id: 'neurohalo',
      name: 'NeuroHalo Temptation',
      subtitle: 'Forbidden Healing',
      price: 149,
      setupFee: 49,
      icon: <Brain className="w-8 h-8" />,
      description: 'Experience pleasure-based healing that touches your soul and awakens dormant sensations through tantric therapeutic methods',
      features: ['Sensual Therapy Modules', 'Orgasmic Progress Tracking', 'Tantric Mindfulness', 'Erotic Crisis Support', 'Pleasure Mapping', 'Sensory Enhancement'],
      demoAudio: false,
      stripeLink: 'https://buy.stripe.com/neurohalo',
      gradient: 'from-purple-500 via-violet-500 to-indigo-500',
      orders: 89,
      revenue: 17622
    },
    FANTASY_BUNDLE: {
      id: 'fantasy_bundle',
      name: 'Fantasy Butterfly Collection',
      subtitle: 'Ultimate Seduction Suite',
      price: 299,
      setupFee: 149,
      icon: <Heart className="w-8 h-8" />,
      description: 'Complete erotic paradise with ASMR goddesses, sultry voice actresses, and unlimited fantasy scenarios that fulfill your wildest dreams',
      features: ['Premium ASMR Library', 'Celebrity Voice Packs', 'Custom Fantasy Builder', 'Seductive Personalities', 'Role-Play Scenarios', 'VIP Exclusive Content'],
      demoAudio: true,
      stripeLink: 'https://buy.stripe.com/fantasy-bundle',
      gradient: 'from-pink-500 via-rose-500 to-purple-500',
      orders: 156,
      revenue: 69944
    }
  };

  const [audioPlaying, setAudioPlaying] = useState({});

  const systemMetrics = [
    { label: 'Active Users', value: '2,847', icon: <Users className="w-5 h-5" /> },
    { label: 'System Uptime', value: '99.9%', icon: <Activity className="w-5 h-5" /> },
    { label: 'API Calls/min', value: '15.2K', icon: <Settings className="w-5 h-5" /> },
    { label: 'Avg Response', value: '127ms', icon: <Activity className="w-5 h-5" /> }
  ];

  const toggleAudio = (productId) => {
    setAudioPlaying(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
    
    // Simulate audio play/pause
    setTimeout(() => {
      setAudioPlaying(prev => ({
        ...prev,
        [productId]: false
      }));
    }, 3000);
  };

  const handleProductOrder = (product) => {
    // Simulate order processing
    const newOrder = {
      id: Date.now(),
      product: product.name,
      amount: product.price + product.setupFee,
      status: 'processing',
      timestamp: new Date().toISOString()
    };
    
    setActiveOrders(prev => [newOrder, ...prev.slice(0, 9)]);
    
    // Update revenue
    setRevenueTracking(prev => ({
      ...prev,
      monthly: prev.monthly + newOrder.amount,
      total: prev.total + newOrder.amount
    }));
  };

  const ProductCard = ({ product }) => (
    <div className="bg-black/60 backdrop-blur-lg rounded-2xl shadow-2xl p-6 hover:shadow-rose-500/30 transition-all duration-500 border border-rose-500/30 group hover:border-rose-400/50 relative overflow-hidden">
      {/* Seductive Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className={`bg-gradient-to-r ${product.gradient} p-4 rounded-xl inline-block mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
        <div className="text-white drop-shadow-lg">
          {product.icon}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-200 transition-colors">{product.name}</h3>
      <p className="text-rose-300 text-sm mb-3 italic">{product.subtitle}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text">
            ${product.price}
          </span>
          <span className="text-sm text-rose-400 ml-2">+ ${product.setupFee} setup</span>
        </div>
        <div className="text-right">
          <div className="text-sm text-rose-400">{product.orders} lovers</div>
          <div className="text-sm font-semibold text-pink-400">${product.revenue.toLocaleString()}</div>
        </div>
      </div>
      
      <p className="text-rose-200 text-sm mb-4 line-clamp-2 italic">"{product.description}"</p>
      
      <div className="space-y-2 mb-4">
        {product.features.slice(0, 2).map((feature, index) => (
          <div key={index} className="flex items-center text-sm text-rose-300">
            <Heart className="w-4 h-4 text-pink-400 mr-2" />
            {feature}
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        {product.demoAudio && (
          <button
            onClick={() => toggleAudio(product.id)}
            className="flex items-center gap-2 px-3 py-2 bg-rose-500/20 border border-rose-400/30 rounded-lg hover:bg-rose-500/30 transition-all duration-300 text-sm text-rose-300 hover:text-rose-200"
          >
            {audioPlaying[product.id] ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {audioPlaying[product.id] ? 'Playing...' : 'Taste'}
          </button>
        )}
        
        <button
          onClick={() => {
            setSelectedProduct(product);
            setShowProductModal(true);
          }}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white rounded-lg hover:from-rose-600 hover:via-pink-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-rose-500/50"
        >
          Explore Desires
        </button>
      </div>
    </div>
  );

  const ProductModal = ({ product, onClose }) => {
    if (!product) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`bg-gradient-to-r ${product.gradient} p-3 rounded-xl`}>
                  <div className="text-white">
                    {product.icon}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                  <p className="text-gray-600">{product.subtitle}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Pricing</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>Product Price:</span>
                    <span className="font-semibold">${product.price}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Setup Fee:</span>
                    <span className="font-semibold">${product.setupFee}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total:</span>
                    <span>${product.price + product.setupFee}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Performance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Orders:</span>
                    <span className="font-semibold">{product.orders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-semibold text-green-600">${product.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conversion:</span>
                    <span className="font-semibold">4.2%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              {product.demoAudio && (
                <button
                  onClick={() => toggleAudio(product.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {audioPlaying[product.id] ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {audioPlaying[product.id] ? 'Playing...' : 'Play Demo'}
                </button>
              )}
              
              <button
                onClick={() => handleProductOrder(product)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 font-semibold"
              >
                Deploy Now - ${product.price + product.setupFee}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-rose-900 to-purple-900 text-white relative overflow-hidden">
      {/* Seductive Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-rose-400 rounded-full filter blur-2xl animate-pulse delay-500"></div>
      </div>
      {/* Header */}
      <div className="border-b border-rose-800/50 bg-black/40 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/50 animate-pulse">
                <span className="text-xl">🦋</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Mariposa AI
                </h1>
                <p className="text-rose-300 text-sm italic">Your Intimate Digital Companion</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${
                systemStatus === 'operational' 
                  ? 'bg-rose-500/30 text-rose-300 border border-rose-400/50' 
                  : 'bg-red-500/30 text-red-300 border border-red-400/50'
              }`}>
                {systemStatus === 'operational' ? '● Ready for Pleasure' : '● Maintenance Mode'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Seductive Revenue Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-rose-500/20 via-pink-500/10 to-transparent backdrop-blur-lg border border-rose-400/30 rounded-2xl p-6 shadow-xl shadow-rose-500/20 hover:shadow-rose-500/40 transition-all duration-500">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6 text-rose-400" />
              <span className="text-rose-300 font-semibold">Desire Revenue</span>
            </div>
            <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text">
              ${revenueTracking.monthly.toLocaleString()}
            </div>
            <div className="text-rose-400 text-sm">+23% more intimate connections</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent backdrop-blur-lg border border-purple-400/30 rounded-2xl p-6 shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-500">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-6 h-6 text-purple-400" />
              <span className="text-purple-300 font-semibold">Total Pleasure</span>
            </div>
            <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              ${revenueTracking.total.toLocaleString()}
            </div>
            <div className="text-purple-400 text-sm">Lifetime satisfaction</div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-500/20 via-rose-500/10 to-transparent backdrop-blur-lg border border-pink-400/30 rounded-2xl p-6 shadow-xl shadow-pink-500/20 hover:shadow-pink-500/40 transition-all duration-500">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-pink-400" />
              <span className="text-pink-300 font-semibold">Devoted Lovers</span>
            </div>
            <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text">
              {revenueTracking.activeSubscriptions}
            </div>
            <div className="text-pink-400 text-sm">Craving more</div>
          </div>
        </div>

        {/* System Metrics - Seductive Version */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {systemMetrics.map((metric, index) => (
            <div key={index} className="bg-black/40 backdrop-blur-md border border-rose-500/30 rounded-xl p-4 hover:border-rose-400/50 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-rose-400 group-hover:text-rose-300 transition-colors">{metric.icon}</div>
                <span className="text-rose-300 text-sm">{metric.label}</span>
              </div>
              <div className="text-xl font-bold text-white group-hover:text-rose-200 transition-colors">{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Seductive Products Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-transparent bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text">
            Mariposa Intimacy Collection
          </h2>
          <p className="text-rose-300 mb-6 italic">Surrender to your deepest desires...</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(mainProducts).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        {activeOrders.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {activeOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <div>
                    <div className="font-semibold">{order.product}</div>
                    <div className="text-sm text-gray-400">{new Date(order.timestamp).toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${order.amount}</div>
                    <div className={`text-sm px-2 py-1 rounded ${
                      order.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => {
            setShowProductModal(false);
            setSelectedProduct(null);
          }} 
        />
      )}
    </div>
  );
};

export default MariposaDeploymentSystem;