package com.krishisetu.model;

import jakarta.persistence.*;

@Entity
@Table(name = "scheme_categories")
public class SchemeCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 64)
    private String slug;

    @Column(name = "name_en", nullable = false, length = 128)
    private String nameEn;

    @Column(name = "name_hi", nullable = false, length = 128)
    private String nameHi;

    @Column(length = 16)
    private String icon = "🌾";

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    public SchemeCategory() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getNameEn() { return nameEn; }
    public void setNameEn(String nameEn) { this.nameEn = nameEn; }

    public String getNameHi() { return nameHi; }
    public void setNameHi(String nameHi) { this.nameHi = nameHi; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
