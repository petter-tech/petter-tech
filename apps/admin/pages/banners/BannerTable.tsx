import { Banner } from "@repo/core-domain/entities/Banner";
import { Button } from "@repo/ui/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React from "react";
import { ConfirmModal } from "@repo/ui/components/ui/confirm-modal";
import { toast } from "sonner";

interface BannerTableProps {
  banners?: Banner[];
  onEdit: (banner: Banner) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
}

const deleteBanner = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";

  const res = await fetch(`${baseUrl}/api/banners/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(id),
  });
  return res.json();
};

function BannerTable({ props }: { props: BannerTableProps }) {
  async function onDelete(id: string) {
    try {
      const result = await deleteBanner(id);
      if (result.type === "error") {
        toast.error("There was an error", {
          description: result.message,
        });
      } else {
        toast.success("Banner successfully deleted");
        props.onDelete(id);
      }
    } catch (error) {
      toast.error("There was an error", {
        description: "Review the email or password",
      });
    }
  }
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-2xl font-semibold">These are the banners</h1>
        <Button
          className="w-full sm:w-auto cursor-pointer"
          onClick={props.onCreate}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Banner
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Headline</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>CTA Text</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.banners?.map((banner) => (
            <TableRow key={banner.id}>
              <TableCell className="font-medium">{banner.title}</TableCell>
              <TableCell>{banner.headline ?? "-"}</TableCell>
              <TableCell className="line-clamp-2 max-w-xs text-ellipsis">
                {banner.description ?? "-"}
              </TableCell>
              <TableCell>{banner.ctaText ?? "-"}</TableCell>
              <TableCell className="flex justify-end items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => props.onEdit(banner)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>

                <ConfirmModal
                  title="¿Estas seguro de Eliminar este Personal?"
                  description="La eliminación del Personal sera de forma permanente."
                  onConfirm={async () => {
                    await onDelete(banner.id);
                  }}
                  triggerIcon={<Trash2 />}
                  confirmVariant="destructive"
                  triggerVariant="destructive"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default BannerTable;
