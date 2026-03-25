import { useState, useEffect, useRef } from "react";
import { Form, Modal, notification, message } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAdDraftStore } from "../../../store/useAdDraftStore";
import { getAdById, updateAd, type UpdateAdData } from "../../../api";

import {
  FindPriceWithAI,
  improveDescriptionWithAI,
} from "../../../services/aiService";
import { parseAiPrice } from "../../../utils/parseAiPrice";

export const useAdEdit = (id: string) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setDraft, getDraft, clearDraft } = useAdDraftStore();
  const draftModalShown = useRef(false);

  // --- Состояния AI для Описания ---
  const [aiStatus, setAiStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [popoverVisible, setPopoverVisible] = useState(false);

  // --- Состояния AI для Цены ---
  const [priceAiStatus, setPriceAiStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [priceAiSuggestion, setPriceAiSuggestion] = useState("");
  const [pricePopoverVisible, setPricePopoverVisible] = useState(false);

  const { data: item, isLoading, isError } = useQuery({
    queryKey: ["ad", id],
    queryFn: () => getAdById(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (values: UpdateAdData) => updateAd(id, values),
    onSuccess: () => {
      clearDraft(id);
      notification.success({ title: "Успешно", description: "Объявление обновлено" });
      queryClient.invalidateQueries({ queryKey: ["ad", id] });
      navigate(`/ads/${id}`);
    },
  });

  useEffect(() => {
    if (item) form.setFieldsValue(item);
    
    if (!draftModalShown.current) {
      const savedDraft = getDraft(id);
      if (savedDraft) {
        draftModalShown.current = true;
        Modal.confirm({
          title: "Найдено неопубликованное изменение",
          content: "Восстановить данные из черновика?",
          okText: "Да",
          cancelText: "Нет",
          onOk: () => form.setFieldsValue(savedDraft),
          onCancel: () => clearDraft(id),
        });
      }
    }
  }, [item, id, form, getDraft, clearDraft]);

  // --- Обработчики AI Описания ---
  const handleAiDescription = async () => {
    const values = form.getFieldsValue();
    setAiStatus("loading");
    setPopoverVisible(false);
    try {
      const res = await improveDescriptionWithAI(values.title, values.category, values.params, values.description);
      setAiSuggestion(res);
      setAiStatus("success");
      setPopoverVisible(true);
    } catch {
      setAiStatus("error");
      setPopoverVisible(true);
    }
  };

  const handleApplyDescription = () => {
    form.setFieldValue("description", aiSuggestion);
    setPopoverVisible(false);
    setDraft(id, form.getFieldsValue());
    message.success("Описание обновлено");
  };

  // --- Обработчики AI Цены ---
  const handleAiPrice = async () => {
    const values = form.getFieldsValue();
    if (!values.title) {
        return message.warning("Введите название для генерации оценки");
    }

    setPriceAiStatus("loading");
    setPricePopoverVisible(false);

    try {
      const suggestion = await FindPriceWithAI(values.title, values.category, values.params, values.description);
      setPriceAiSuggestion(suggestion.toString());
      setPriceAiStatus("success");
      setPricePopoverVisible(true);
    } catch {
      setPriceAiStatus("error");
      setPricePopoverVisible(true);
    }
  };

  const handleApplyPrice = () => {
    const numericPrice = parseAiPrice(priceAiSuggestion);
    if (numericPrice) {
      form.setFieldValue("price", numericPrice);
      setDraft(id, form.getFieldsValue());
      setPricePopoverVisible(false);
      message.success("Цена установлена");
    } else {
      message.error("Не удалось определить цену автоматически");
    }
  };

  return {
    form,
    item,
    isLoading,
    isError,
    mutation,
    // Данные для блока описания
    ai: { 
      status: aiStatus, 
      suggestion: aiSuggestion, 
      visible: popoverVisible, 
      setVisible: setPopoverVisible, 
      handleAction: handleAiDescription,
      handleApply: handleApplyDescription,
    },
    // Данные для блока цены
    priceAi: {
      status: priceAiStatus,
      suggestion: priceAiSuggestion,
      visible: pricePopoverVisible,
      setVisible: setPricePopoverVisible,
      handleAction: handleAiPrice,
      handleApply: handleApplyPrice,
    },
    actions: {
      setDraft: (vals: UpdateAdData) => setDraft(id, vals),
    },
  };
};