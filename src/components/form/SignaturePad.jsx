"use client";
import React, { useRef, useState, useCallback } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { X, RotateCcw, Download, AlertCircle } from 'lucide-react';

const SignaturePad = ({
  onSave,
  onClose,
  width = 500,
  height = 200,
  penColor = 'black',
  backgroundColor = 'white',
  required = false,
  validate = true,
  maxWidth = 2,
  minWidth = 1
}) => {
  const sigCanvas = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);

  const clear = useCallback(() => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setIsEmpty(true);
    }
  }, []);

  const save = useCallback(() => {
    if (sigCanvas.current) {
      if (sigCanvas.current.isEmpty()) {
        setIsEmpty(true);
        return false;
      }
      
      const signatureData = sigCanvas.current.toDataURL('image/png');
      if (onSave) {
        onSave(signatureData);
      }
      return true;
    }
    return false;
  }, [onSave]);

  const handleBeginDraw = () => {
    setIsDrawing(true);
  };

  const handleEndDraw = () => {
    setIsDrawing(false);
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      setIsEmpty(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            Sign Here
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Signature Canvas */}
        <div className="p-4">
          <div 
            className="border-2 border-gray-300 rounded-lg overflow-hidden"
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            <SignatureCanvas
              ref={sigCanvas}
              penColor={penColor}
              canvasProps={{
                width,
                height,
                className: 'sig-canvas bg-white',
                style: { backgroundColor }
              }}
              onBegin={handleBeginDraw}
              onEnd={handleEndDraw}
              minWidth={minWidth}
              maxWidth={maxWidth}
              throttle={1}
            />
          </div>
          
          {/* Validation Message */}
          {validate && isEmpty && (
            <div className="flex items-center gap-2 mt-2 text-sm text-amber-600">
              <AlertCircle className="w-4 h-4" />
              <span>Please provide your signature</span>
            </div>
          )}
        </div>

        {/* Footer - Actions */}
        <div className="flex items-center justify-between p-4 border-t bg-gray-50">
          <button
            onClick={clear}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={save}
              disabled={validate && isEmpty}
              className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-4 h-4" />
              Save Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignaturePad;